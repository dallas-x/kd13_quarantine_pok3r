import express from 'express';
import { updatePlayersStats } from '../controllers/processGame';

const uploadRouter = express.Router();

uploadRouter
  .route('/upload')
  .get((req, res) => {
    res.send('success');
  })
  .post((req, res) => {
    let Players = req.body;
    let TTP = Players.length;
    let results = Players.map(({ data }) => {
      let rScore = TTP - data.Rank + 1;
      return {
        Player_ID: data.ID,
        Player: data.Player,
        Score: rScore,
        Rank: data.Rank,
        TPP: TTP,
      };
    });
    updatePlayersStats(results)
      .then((response) => {
        res.sendStatus(200);
      })
      .catch((upsert_err) => {
        res.sendStatus(500);
      });
  });

export default uploadRouter;
