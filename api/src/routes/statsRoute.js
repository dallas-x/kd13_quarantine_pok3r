import express from 'express';
import { selectStats } from '../controllers/processGame';
import { resetPlayers } from '../controllers/dbFunc';

const statsRouter = express.Router();
const playerStats = {
  Players: [
    { Rank: 1, Player: 'Dallas Baker', ID: 'kd13', Score: 32 },
    { Rank: 2, Player: 'Zach n Cody', ID: 'kd42', Score: 12 },
  ],
};

statsRouter
  .route('/stats')
  .get((req, res) => {
    selectStats()
      .then((response) => {
        console.log(response);
        res.json(response);
      })
      .catch((err) => {
        console.error(err);
        res.json(playerStats);
      });
  })
  .post((req, res) => {
    res.send('you can not post sorry :/');
  });

statsRouter
  .route('/stats/reset')
  .get((req, res) => {
    resetPlayers()
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        console.error(err);
        res.json(playerStats);
      });
  })
  .post((req, res) => {
    res.send('you can not post sorry :/');
  });

export default statsRouter;
