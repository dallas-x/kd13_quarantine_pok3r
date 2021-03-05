import express from 'express';
import debug from 'debug';
import chalk from 'chalk';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import database from './src/controllers/dbFunc';
import uploadRouter from './src/routes/uploadRoute';
import statsRouter from './src/routes/statsRoute';

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public/')));

require('./src/config/passport')(app);

app.use(uploadRouter);
app.use(statsRouter);

database.createTables();

app.listen(port, (err) => {
  debug(`running on server port ${chalk.green(port)}`);
  if (err) {
    debug(`Error has accured ${err}`);
  }
});
