import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./api/src/db/stats.db', (err) => {
  if (err) {
    throw new Error(err);
  }
});

export default function createTables() {
  db.run(`CREATE TABLE if not exists
          "playerStats" ( "Rank", "Player_ID" type UNIQUE, "Player", "Score", "TPP", "Games_Played")`);
  db.run(`CREATE TABLE if not exists
          "gameStats" ( "Total_Games", "TPP")`);
}

const selectItem = (item) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT distinct ${item || '*'} FROM playerStats`, (err, rows) => {
      if (err) {
        reject('empty');
      }
      resolve(rows.map((player) => player.Player_ID));
    });
  });
};

const upsertPlayers = (Players, tpp) => {
  return new Promise((resolve, reject) => {
    let template = Players.map(
      (player) =>
        `(${player.Rank},"${player.Player_ID}","${player.Player}",${player.Score},${tpp}, 1)`,
    ).join(',');
    let stmt = `INSERT INTO playerStats (Rank, Player_ID, Player, Score, TPP, Games_Played) 
VALUES ${template}
ON CONFLICT(Player_ID) DO UPDATE 
SET Score = Score+excluded.Score, Games_Played=Games_Played+1, TPP=TPP+excluded.TPP`;
    db.run(stmt, function (upsert_error) {
      if (!upsert_error) {
        resolve({ status: 0, reason: 'Players were udpated in DB' });
      } else {
        reject({ status: 1, reason: upsert_error });
      }
    });
  });
};

// Legacy Do not use: Please use upsertPlayers!
const addPlayers = (Players, tpp) => {
  return new Promise((resolve, reject) => {
    let template = Players.map(
      (player) =>
        `(${player.Rank},"${player.Player_ID}","${player.Player}",${player.Score},${tpp}, 1)`,
    ).join(',');
    const addSTMT = `INSERT into playerStats(Rank, Player_ID, Player, Score, TPP, Games_Played) VALUES ${template}`;

    db.run(addSTMT, function (add_players_error) {
      if (!add_players_error) {
        resolve({ status: 0, reason: 'Players were added to DB' });
      } else {
        reject({ status: 1, reason: add_players_error });
      }
    });
  });
};

const resetPlayers = () => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM playerStats', (failed_to_delete_error) => {
      if (failed_to_delete_error) {
        reject({ status: 1, reason: failed_to_delete_error });
      }
      resolve({ status: 0, reason: 'poker stats deleted!' });
    });
  });
};

module.exports = {
  createTables,
  selectItem,
  addPlayers,
  resetPlayers,
  upsertPlayers,
};
