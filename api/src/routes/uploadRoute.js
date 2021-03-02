import express from 'express';
import { updateStats } from '../controllers/processGame';

const uploadRouter = express.Router();

uploadRouter
  .route('/upload')
  .get((req, res) => {
    res.send('success');
  })
  .post((req, res) => {
    let Players = req.body;
    console.log(Players);
    let TTP = Players.length;
    let results = Players.map(({ data }) => {
      let rScore = TTP - data.Rank + 1;
      console.log(data.Rank);
      return {
        Player_ID: data.ID,
        Player: data.Player,
        Score: rScore,
        Rank: data.Rank,
        TPP: TTP,
      };
    });
    updateStats(results)
      .then((response) => {
        console.log(response);
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  });

export default uploadRouter;
