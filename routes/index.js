var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var CircularJSON = require('circular-json');
var moment = require('moment');
var dbConnect = require('../db');
var db;
MongoClient.connect(dbConnect.url, (err, database) => {
    if (err)
        return console.log(err)
    db = database
});

var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  let obj = await db.collection('privateLabel').find({}).toArray();
  let response = JSON.stringify(obj);
  return res.send(response);
});

router.post('/addLabel', async function (req, res) {
   let response = await db.collection('privateLabel').insertOne({
    seller: req.body.seller,
    product: req.body.product,
    referral:req.body.referral,
    referral_url:req.body.referral_url,
    date_added:  moment(Date.now()).format('YYYY-MM-DD')
  });
  res.send('true');
});
module.exports = router;