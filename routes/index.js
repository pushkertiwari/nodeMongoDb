var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var CircularJSON = require('circular-json');
// Use connect method to connect to the server
// MongoClient.connect(url, function (err, client) {
//   assert.equal(null, err);
//   console.log("connected sucessfully to server");

//   var db = client.db(dbName);
//  // client.close();
// });


var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  let db = await MongoClient.connect("mongodb://localhost:27017/node");

  let obj = await db.collection('users').find({}).toArray();
  let response = JSON.stringify(obj);
  return res.send(response);
});

router.post('/get', async function (req, res) {
  let db = await MongoClient.connect("mongodb://localhost:27017/node");
   let response = await db.collection('users').insertOne({
    name: req.body.name
  });
  res.send('true');
});
module.exports = router;