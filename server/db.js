"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.connectToDb = void 0;
const mongodb_1 = require("mongodb");
let dbConnection;
// This for running in mongosh
// mongosh "mongodb+srv://ieeealexbranch.ciffu0c.mongodb.net/" --apiVersion 1 --username ieeescssalexsc
const connectToDb = (cb) => {
    const uri = `mongodb+srv://ieeescssalexsc:${process.env.DB_PASSWORD}@ieeealexbranch.ciffu0c.mongodb.net/IEEEAlexBranch?retryWrites=true&w=majority&appName=IEEEAlexBranch`;
    mongodb_1.MongoClient.connect(uri)
        .then((client) => {
        dbConnection = client.db();
        cb();
    })
        .catch((error) => {
        console.error(error);
        cb(error);
    });
};
exports.connectToDb = connectToDb;
const getDb = () => {
    return dbConnection;
};
exports.getDb = getDb;
