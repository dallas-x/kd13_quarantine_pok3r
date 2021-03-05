import express from 'express';
import { getStats } from '../controllers/processGame';
import { resetPlayers } from '../controllers/dbFunc';

const statsRouter = express.Router();

statsRouter.route('/stats/get').get((req, res) => {
  getStats()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json({
        status: 1,
        reason: err,
        data: { Players: [{ Player_ID: 0, Player: 'No Player Found', Score: 0 }] },
      });
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
