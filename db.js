var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'node';

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);
  console.log("connected sucessfully to server");

  const db = client.db(dbName);
  client.close();
});
module.exports = function (callback) {
    if (db || error) {
        callback(error, db);
    } else {
        waiting.push(callback);
    }
}