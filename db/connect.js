const dotenv = require('dotenv');
dotenv.config();
const mongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

const connectDB = () => {
    mongoose.connect(URI);
    console.log('Mongoose Connected');
};

let _db;

const initDb = (callback) => {
    if (_db) {
        console.log('Db is already initialized!');
        return callback(null, _db);
    }
    mongoClient
        .connect(process.env.MONGODB_URI)
        .then((client) => {
            _db = client;
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDb = () => {
    if (!_db) {
        throw Error('Db not initialized');
    }
    return _db;
};

module.exports = {
    initDb,
    getDb,
    connectDB
};
