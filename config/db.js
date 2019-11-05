const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const assert = require('assert');

let _db;
let mongoDB = process.env.MONGODB_URI;

module.exports = {
    getDb,
    initDb
};

// MongoDB Client Connection
function initDb(callback) {
    if (_db) {
        console.warn("Trying to init DB again!");
        return callback(null, _db);
    }

    MongoClient.connect(mongoDB, {
        autoIndex: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, connected);

    function connected(err, db) {
        if (err) {
            return callback(err);
        }
        console.log("DB initialized - connected to: " + config.db.connectionString.split("@")[1]);
        _db = db;
        return callback(null, _db);
    }
}

function getDb() {
    assert.ok(_db, "Db has not been initialized. Please called init first.");
    return _db;
}

// Mongoose Connection
try {
    mongoose.connect(mongoDB, {
        autoIndex: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
} catch (err) {
    console.log(err);
}

var mongooseClient = mongoose.connection;
mongooseClient.on('error', console.error.bind(console, 'connection error:'));

// export default client;