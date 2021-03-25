import express from 'express';
import { updatePlayersStats } from '../controllers/processGame';
import updatePlayers from '../DB/updatePlayers';

const uploadRouter = express.Router();

uploadRouter
  .route('/upload')
  .get((req, res) => {
    res.send('success');
  })
  .post((req, res) => {
    let Players = req.body;
    let TPP = Players.length;
    let results = Players.map(({ data }) => {
      let rScore = TPP - data.Rank;
      return {
        Player_ID: data.ID,
        Player: data.Player,
        Score: rScore,
        Rank: data.Rank,
        TPP: TPP,
      };
    });
    updatePlayers(results);
    updatePlayersStats(results)
      .then((response) => {
        res.sendStatus(200);
      })
      .catch((upsert_err) => {
        res.sendStatus(500);
      });
  });

export default uploadRouter;
