import express from 'express';
import { selectStats } from '../controllers/processGame';
import { resetPlayers } from '../controllers/dbFunc';

const statsRouter = express.Router();

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
