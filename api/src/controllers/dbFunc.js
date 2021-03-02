import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./api/src/db/stats.db', (err) => {
  if (err) console.error(err);
});

const createTables = () => {
  db.run(`CREATE TABLE if not exists
          "pokerStats" ( "Rank", "Player_ID", "Player", "Score", "TPP")`);
};

const selectItem = (item) => {
  console.log(item);
  return new Promise((resolve, reject) => {
    db.all(`SELECT distinct ${item || '*'} FROM pokerStats`, (err, rows) => {
      if (err) {
        reject('empty');
      }
      resolve(rows.map((player) => player.Player_ID));
    });
  });
};

const updatePlayers = (Players) => {};

const addPlayers = (Players, ttp) => {
  return new Promise((resolve, reject) => {
    let template = Players.map(
      (player) =>
        `(${player.Rank},"${player.Player_ID}","${player.Player}",${player.Score},"${ttp}")`,
    ).join(',');
    const addSTMT = `INSERT into pokerStats(Rank, Player_ID, Player, Score, TTP) VALUES ${template}`;

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
    db.run('DELETE FROM pokerStats', (failed_to_delete_error) => {
      if (failed_to_delete_error) {
        reject({ status: 1, reason: failed_to_delete_error });
      }
      resolve({ status: 0, reason: 'poker stats deleted!' });
    });
  });
};

module.exports = { createTables, selectItem, updatePlayers, addPlayers, resetPlayers };
