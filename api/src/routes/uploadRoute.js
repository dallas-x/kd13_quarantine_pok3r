import express from 'express';

const uploadRouter = express.Router();

uploadRouter
  .route('/upload')
  .get((req, res) => {
    res.send('success');
  })
  .post((req, res) => {
    let results = req.body.map((player) => {
      return player.data;
    });
    console.log(results);
    console.log(results.length);
    res.json('success');
  });

export default uploadRouter;
