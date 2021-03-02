import express from 'express';
import debug from 'debug';
import chalk from 'chalk';
import bodyParser from 'body-parser';
import path from 'path';
import database from './src/controllers/dbFunc';
import uploadRouter from './src/routes/uploadRoute';
import statsRouter from './src/routes/statsRoute';
import testRouter from './src/routes/testRoute';

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public/')));
app.use(uploadRouter);
app.use(statsRouter);
app.use(testRouter);

database.createTables();

app.get('/hey', (req, res) => res.send('ho!'));

app.get('/file', (req, res) => res.sendFile(path.join(__dirname, '/src/resources/poker.csv')));

app.listen(port, (err) => {
  debug(`running on server port ${chalk.green(port)}`);
  if (err) {
    debug(`Error has accured ${err}`);
  }
});
