import path from 'path';
import sqlite3 from 'sqlite3';
const dbloc = path.dirname(require.main.filename);

const openDB = () => {
  return new sqlite3.Database(path.join(dbloc, '/db/main.db'), (err_opening_db) => {
    if (err_opening_db) {
      throw new Error(err_opening_db);
    }
  });
};

export default async function createTables() {
  const db = await openDB();
  await db.run(`CREATE TABLE if not exists
          "playerStats" ( "Rank", "Player_ID" type UNIQUE, "Player", "Score", "TPP", "Games_Played")`);
  await db.run(`CREATE TABLE if not exists
          "gameStats" ( "Total_Games", "TPP")`);
  db.close();
}

const selectStats = async (item) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    db.all(`SELECT ${item || '*'} FROM playerStats ORDER BY Score DESC`, (err, rows) => {
      if (err) {
        reject({ status: 500, reason: 'Failed to get players' });
      }
      let data;
      item ? (data = rows.map((player) => player[item])) : (data = rows);
      resolve({ status: 200, data: data });
    }).close();
  });
};

const upsertPlayers = async (Players, tpp) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    let template = Players.map(
      (player) =>
        `(${player.Rank},"${player.Player_ID}","${player.Player}",${player.Score},${tpp}, 1)`,
    ).join(',');

    let stmt = `INSERT INTO playerStats (Rank, Player_ID, Player, Score, TPP, Games_Played) 
                VALUES ${template}
                ON CONFLICT(Player_ID) DO UPDATE 
                SET Score = Score+excluded.Score,
                            Games_Played=Games_Played+1,
                            TPP=TPP+excluded.TPP`;

    db.run(stmt, function (upsert_error) {
      if (!upsert_error) {
        resolve({ status: 0, reason: 'Players were udpated in DB' });
      } else {
        reject({ status: 1, reason: upsert_error });
      }
    }).close();
  });
};

const resetPlayers = async () => {
  const db = openDB();
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM playerStats', (failed_to_delete_error) => {
      if (failed_to_delete_error) {
        reject({ status: 1, reason: failed_to_delete_error });
      }
      resolve({ status: 0, reason: 'poker stats deleted!' });
    }).close();
  });
};

module.exports = {
  createTables,
  selectStats,
  resetPlayers,
  upsertPlayers,
};
