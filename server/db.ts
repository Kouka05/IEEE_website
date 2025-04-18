import { MongoClient, Db, MongoError } from 'mongodb';
let dbConnection: Db;

// This for running in mongosh
// mongosh "mongodb+srv://ieeealexbranch.ciffu0c.mongodb.net/" --apiVersion 1 --username ieeescssalexsc

export const connectToDb = (cb: (err?: MongoError) => void): void => {
  const uri = `mongodb+srv://ieeescssalexsc:${process.env.DB_PASSWORD}@ieeealexbranch.ciffu0c.mongodb.net/IEEEAlexBranch?retryWrites=true&w=majority&appName=IEEEAlexBranch`;
  MongoClient.connect(uri)
    .then((client) => {
      dbConnection = client.db();
      cb();
    })
    .catch((error: MongoError) => {
      console.error(error);
      cb(error);
    });
};

export const getDb = (): Db => {
  return dbConnection;
};
