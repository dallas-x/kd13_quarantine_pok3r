import dotenv from 'dotenv';
dotenv.config();
const { MongoClient, ObjectID } = require('mongodb');
const PASSWORD = process.env.MONGO_TEST_PASSWORD;
const USERNAME = process.env.MONGO_TEST_USERNAME;
const dbName = 'pok3r-testing';

function crudTest() {
  const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@main.llmcq.mongodb.net/pok3r-testing?retryWrites=true&w=majority`;

  const loadData = (data) => {
    return new Promise((resolve, reject) => {
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      try {
        client
          .connect()
          .then((client) => {
            const db = client.db(dbName);
            console.log(db);
            db.collection('Pizzas')
              .insertMany(data)
              .then((results) => {
                console.log(db);
                resolve(results);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        reject(error);
      } finally {
        client.close();
      }
    });
  };
  const get = (query) => {
    query ? query : {};
    return new Promise((resolve, reject) => {
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      try {
        client.connect().then((client) => {
          const db = client.db(dbName);
          const items = db.collection('Pizzas').find(query);

          items.toArray((err, results) => {
            resolve(results);
          });
        });
      } catch (error) {
        reject(error);
      } finally {
        client.close();
      }
    });
  };

  const getById = (id) => {
    return new Promise((resolve, reject) => {
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      try {
        client.connect().then((client) => {
          const db = client.db(dbName);
          const items = db.collection('Pizzas').find({ _id: ObjectID(id) });

          items.toArray((err, results) => {
            resolve(results);
          });
        });
      } catch (error) {
        reject(error);
      } finally {
        client.close();
      }
    });
  };

  const create = async () => {
    return new Promise((resolve, reject) => {
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      try {
        // Connect the client to the server

        // Establish and verify connection
        client.connect().then((client) => {
          console.log(client);
          client.db('pok3r-testing').createCollection('Pizzas', (err, results) => {
            if (err) {
              console.error(err);
            }
            console.log('created collection');
            console.log(results);
            resolve(results);
          });
        });
      } catch (error) {
        // Ensures that the client will close when you finish/error
        console.log(error);
      }
    });
  };

  return { loadData, get, getById, create };
}
// const create = async () => {
//   try {
//     // Connect the client to the server

//     // Establish and verify connection
//     await client.db('admin').command({ ping: 1 });
//     console.log('Connected successfully to server');
//     client.db('pok3r-testing').createCollection('Pizza', (err, result) => {
//       if (err) {
//         console.error(err);
//       }
//       console.log("Kid's Pizza is NOW OPEN!");
//     });
//   } finally {
//     // Ensures that the client will close when you finish/error
//   }
// };

// const insert = async () => {
//   try {
//     // Connect the client to the server

//     // Establish and verify connection
//     await client.db('pok3r-testing').command({ ping: 1 });
//     client
//       .db('pok3r-testing')
//       .collection('Pizza')
//       .insertOne(pizzaDocument, (err, result) => {
//         if (err) throw err;
//         console.log('Pizza in the oven!');
//       });
//   } finally {
//     // Ensures that the client will close when you finish/error
//   }
// };

// const find = async () => {
//   try {
//     // Connect the client to the server

//     // Establish and verify connection
//     await client.db('pok3r-testing').command({ ping: 1 });
//     client
//       .db('pok3r-testing')
//       .collection('Pizza')
//       .find({})
//       .toArray((err, result) => {
//         if (err) throw err;
//         console.log(result);
//       });
//   } finally {
//     // Ensures that the client will close when you finish/error
//   }
// };

// const findone = async () => {
//   try {
//     // Connect the client to the server
//     const q = { toppings: 'San Marzano tomatoes' };
//     // Establish and verify connection
//     await client.db('pok3r-testing').command({ ping: 1 });
//     client
//       .db('pok3r-testing')
//       .collection('Pizza')
//       .find(q)
//       .toArray((err, result) => {
//         if (err) throw err;
//         console.log(result);
//       });
//   } finally {
//     // Ensures that the client will close when you finish/error
//   }
// };

// const close = async () => {
//   try {
//     // Connect the client to the server

//     // Establish and verify connection
//     await client.db('pok3r-testing').command({ ping: 1 });
//     client.db('pok3r-testing').dropCollection('Pizza');
//     client.close();
//   } finally {
//     // Ensures that the client will close when you finish/error
//     console.log('Pizza shop is closed!');
//   }
// };

module.exports = crudTest();
