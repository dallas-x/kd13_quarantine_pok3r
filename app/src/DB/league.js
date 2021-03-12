import debug from 'debug';
import chalk from 'chalk';
import dotenv from 'dotenv';
dotenv.config();

const MongoClient = require('mongodb').MongoClient;
const PASSWORD = process.env.MONGO_PASSWORD;
const USERNAME = process.env.MONGO_USERNAME;
const dbName = process.env.MONGO_DB_NAME;
const PROJ_NAME = process.env.MONGO_PROJ_NAME;
const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@main.llmcq.mongodb.net/${PROJ_NAME}?retryWrites=true&w=majority`;

function League() {
  const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@main.llmcq.mongodb.net/${PROJ_NAME}?retryWrites=true&w=majority`;
  const loadStats = (Players, TTP, Lid) => {
    Lid = 'Dallas';
    return new Promise((resolve, reject) => {
      console.log(uri);
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      try {
        const Player_IDs = Players.map((player) => player.Player_ID);
        const filter = { League_id: Lid };
        const update = { $set: { 'Details.Players': Players } };
        const options = { upsert: true };
        console.log(filter);
        console.log(update);
        client.connect().then((client) => {
          const db = client.db(dbName);
          db.collection('league')
            .updateMany(filter, update, options)
            .then((results) => {
              resolve(results);
              client.close();
            });
        });
      } catch (error) {
        // Todo: Send to Splunk for further analysis
        debug(
          `${chalk.bgYellow('There was an error connecting to Mongo!')} \n ${chalk.red(error)}`,
        );
      }
      console.log(chalk.blue(JSON.stringify(Players)));
    });
  };
  return { loadStats };
}

export default League();
