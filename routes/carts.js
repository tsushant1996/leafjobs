const express = require('express');
const router = express.Router();
//var MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
async = require("async");
var mongoose = require('mongoose');
var json = {};
var model = require('../models/models');
var CARTS_COLLECTION = model.carts;
var mongoose = require('mongoose');

// Using `mongoose.connect`...
var promise = mongoose.connect('mongodb://sushant:sushant@ds119688.mlab.com:19688/nodeauth', {
  useMongoClient: true,
  /* other options */
});
// Or `createConnection`
var promise = mongoose.createConnection('mongodb://sushant:sushant@ds119688.mlab.com:19688/nodeauth', {
  useMongoClient: true,
  /* other options */
});

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://sushant:sushant@ds119688.mlab.com:19688/nodeauth";

router.post('/saveCart', function(req, res, next){
    console.log('req.body',req.body);
    var cartObject = {
        'userId':'123456',
        'products': req.body, 
      }

      var cart = new CARTS_COLLECTION(cartObject);
      cart.save(function(err, cart){
        if (err){
          json.status = '0';
          json.result = { 'error': 'cart not saved!' };
          res.send(json);
        } else {
          json.status = '1';
          json.result = { 'message': 'cart saved successfully.', 'cart': cart };
          res.send(json);
        }
      });
});


module.exports = router;