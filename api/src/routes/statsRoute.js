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

statsRouter.route('/stats').get((req, res) => {
  selectStats()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json({ status: 1, reason: err, data: playerStats });
    });
});

statsRouter.route('/stats/reset').get((req, res) => {
  resetPlayers()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json({ status: 1, reason: err });
    });
});

export default statsRouter;
