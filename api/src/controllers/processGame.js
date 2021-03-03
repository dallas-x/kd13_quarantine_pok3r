import { upsertPlayers, selectStats } from './dbFunc';

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

const getStats = async () => {
  const players = await selectStats();
  return new Promise((resolve, reject) => {
    if (players.status === 200) {
      resolve(players.data);
    } else {
      reject({ status: 500, reason: 'There was an error getting players' });
    }
  });
};

module.exports = { getStats, updatePlayersStats };
