import express from 'express';
import { updatePlayersStats } from '../controllers/processGame';
import league from '../DB/league';

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
      let rScore = TTP - data.Rank;
      return {
        Player_ID: data.ID,
        Player: data.Player,
        Score: rScore,
        Rank: data.Rank,
        TPP: TTP,
      };
    });
    league.loadStats(results);
    updatePlayersStats(results)
      .then((response) => {
        res.sendStatus(200);
      })
      .catch((upsert_err) => {
        res.sendStatus(500);
      });
  });

export default uploadRouter;
