import sqlite3 from 'sqlite3';
import { upsertPlayers } from './dbFunc';

const db = new sqlite3.Database('./api/src/db/stats.db', (err) => {
  if (err) {
    throw new Error(err);
  }
});

const updatePlayersStats = async (Players) => {
  const tpp = Players.length;
  let updating = await upsertPlayers(Players, tpp);
  return new Promise((resolve, reject) => {
    if (updating.status !== 0) {
      reject(500);
    }
    resolve(200);
  });
};

const selectStats = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      const strSTMT = `SELECT * FROM playerStats`;
      db.all(strSTMT, function (dberror, rows) {
        if (dberror) {
          reject(dberror);
        } else {
          resolve(rows);
        }
      });
    });
  });
};

module.exports = { selectStats, updatePlayersStats };
