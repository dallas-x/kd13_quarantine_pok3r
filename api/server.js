import express from 'express';
import debug from 'debug';
import chalk from 'chalk';
import bodyParser from 'body-parser';
import path from 'path';
import uploadRouter from './src/routes/uploadRoute';

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public/')));
app.use(uploadRouter);

app.get('/hey', (req, res) => res.send('ho!'));

app.get('/file', (req, res) => res.sendFile(path.join(__dirname, '/src/resources/poker.csv')));

app.listen(port, (err) => {
  debug(`running on server port ${chalk.green(port)}`);
  if (err) {
    debug(`Error has accured ${err}`);
  }
});
