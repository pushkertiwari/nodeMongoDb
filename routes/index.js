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

router.post('/addReferral',async function(req,res){
  let response = await db.collection('addreferral').insertOne({
    seller: req.body.seller,
    product: req.body.product,
    referralCode: req.body.referralCode,
    referralUrl:req.body.referralUrl,
    note:req.body.note,
    discount:req.body.discount,
    commission: req.body.commission,
    moxaUrl:req.body.moxaUrl
  });
  res.send('true');
});
router.get('/getReferral', async function (req, res, next) {
  let obj = await db.collection('addreferral').find({}).toArray();
  let response = JSON.stringify(obj);
  return res.send(response);
});

router.post('/dealers',function(req,res){
  var data = req.body;
  if(data !=''){
    db.collection('dealers').insert(data,function(err,result){
      if(err){
         console.log(err);
      }else{
         console.log(result);
          res.send(result[0]);
      }
    });
    return res.status(200).send('inserted');
  }else{
    return res.status(500).send('Something broke!');
  }
});

router.get('/fetchDealers',async function(req,res){
  let obj = await db.collection('dealers').find({}).toArray();
  let response = JSON.stringify(obj);
  return res.send(response);
});

router.post('/productDealer',function(req,res){
  var data = req.body;
  if(data !=''){
    db.collection('products').insert(data,function(err,result){
      if(err){
        console.log(err);
      }else{
        console.log('added dealer product');
      }
      res.status(200).send('inserted');
    });
  }else{
    res.status(400).send('error');
  }
});
router.get('/dealerProduct',async function(req,res){
 
  console.log(req.param('dealer'));
  var dealer = req.param('dealer');
  if(dealer !=''){
    var query = { 'seller': dealer };
    console.log(query);
    db.collection('products').find(query).toArray(function(err,result){
      if(err){
        console.log(err);
      }else{
        let response = JSON.stringify(result);
         return res.send(response);
      }
    });
  }
});
module.exports = router;