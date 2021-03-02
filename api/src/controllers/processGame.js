import sqlite3 from 'sqlite3';
import { selectItem, addPlayers, updatePlayers } from './dbFunc';

const db = new sqlite3.Database('./api/src/db/stats.db', (err) => {
  if (err) console.error(err);
});

// This is called when the user uploads a new file!
const updateStats = async (Players) => {
  const tpp = Players.length;
  const currentPlayers = await selectItem('Player_ID');
  const playersToAdd = await Players.filter(
    ({ Player_ID }) => !currentPlayers.some((playerid) => Player_ID === playerid),
  );

  const playersToUpdate = await Players.filter(({ Player_ID }) =>
    currentPlayers.some((playerid) => Player_ID === playerid),
  );
  let warning = `Players: ${currentPlayers}\nplayers to update: ${playersToUpdate}\nplayers to add: ${playersToAdd}`;
  console.log(warning);
  const playersAdded = await addPlayers(playersToAdd, tpp);
  const playersUpdated = await updatePlayers(playersToUpdate);
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      let updatePlayers = Players.map((player) => {
        if (currentPlayers[player.Player_ID]) {
          return player.Player_ID;
        }
      });
    });
  });
};

const selectStats = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      const strSTMT = `SELECT * FROM pokerStats`;
      console.log(strSTMT);
      db.all(strSTMT, function (dberror, rows) {
        if (dberror) {
          console.error(dberror);
          reject(dberror);
        } else {
          rows.forEach((row) => console.log(row));
          resolve(rows);
        }
      });
    });
  });
};

module.exports = { updateStats, selectStats };
