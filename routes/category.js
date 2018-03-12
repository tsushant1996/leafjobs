const express = require('express');
const router = express.Router();
//var MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
async = require("async");
var mongoose = require('mongoose');
var json = {};
var model = require('../models/models');
var CATEGORY_COLLECTION = model.categories;
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

router.get('/getAllCategory', function(req, res, next) {
    var query = {};
    var  totalRecords = 0;
  
    CATEGORY_COLLECTION.count(query, function(err, counts){
      totalRecords = counts;
        CATEGORY_COLLECTION.find(query, function(categoryerror, categories){
          if (categoryerror || categories.length <= 0) {
            json.status = '0';
            json.result = { 'message': 'categories not found!' };
            res.send(json);
          } else {
            json.status = '1';
            json.result = { 'message': 'categories found successfully.', 'categories': categories, 'totalRecords': totalRecords };
            res.send(json);
          }
      });
    });
  });

module.exports = router;