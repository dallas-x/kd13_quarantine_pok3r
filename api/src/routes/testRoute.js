import express from 'express';
import { updateStats, selectStats } from '../controllers/processGame';

const testRouter = express.Router();
const playerStats = {
  Players: [
    { Rank: 1, Player: 'Dallas Baker', Player_ID: 'kd13', Score: 32 },
    { Rank: 2, Player: 'Zach n Cody', Player_ID: 'kd42', Score: 12 },
    { Rank: 3, Player: 'Bob the Builder', Player_ID: 'kd92', Score: 1 },
    { Rank: 4, Player: 'Goku', Player_ID: 'kd99', Score: 98 },
  ],
};

testRouter
  .route('/testCreation')
  .get((req, res) => {
    updateStats(playerStats.Players)
      .then((response) => {
        console.log(response);
        res.json(response);
      })
      .catch((err) => {
        console.error(err);
        res.send('500');
      });
  })
  .post((req, res) => {
    res.send('you can not post sorry :/');
  });

testRouter.route('/testSelect').get((req, res) => {
  selectStats()
    .then((response) => {
      console.log(response);
      res.json(response);
    })
    .catch((error) => {
      console.error(error);
    });
});

export default testRouter;
