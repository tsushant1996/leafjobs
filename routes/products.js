const express = require('express');
const router = express.Router();
//var MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
async = require("async");
var mongoose = require('mongoose');
var json = {};
var model = require('../models/models');
var PRODUCTS_COLLECTION = model.products;
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


//FOR SAVING THE PRODUCT

router.post('/saveProduct', function(req, res, next){
  var productObject = {
    'name': req.body.name,
    'category': req.body.category,
    'price': req.body.price,
    'productImageUrl':req.body.productImageUrl
  }

  var product = new PRODUCTS_COLLECTION(productObject);
  product.save(function(err, product){
    if (err){
      json.status = '0';
      json.result = { 'error': 'Product not saved!' };
      res.send(json);
    } else {
      json.status = '1';
      json.result = { 'message': 'Product saved successfully.', 'product': product };
      res.send(json);
    }
  })
});

// FOR GETTING ALL PRODUCTS
router.get('/getAllProducts', function(req, res, next) {
  var query = {};
  var  totalRecords = 0;

  PRODUCTS_COLLECTION.count(query, function(err, counts){
    totalRecords = counts;
      PRODUCTS_COLLECTION.find(query, function(productserror, products){
        if (productserror || products.length <= 0) {
          json.status = '0';
          json.result = { 'message': 'Products not found!' };
          res.send(json);
        } else {
          json.status = '1';
          json.result = { 'message': 'Products found successfully.', 'products': products, 'totalRecords': totalRecords };
          res.send(json);
        }
    });
  });
});

// FOR REMOVING THE PRODUCTS
router.delete('/removeProductById/:id', function (req, res, next) {
  var productId = req.params.id;
  var query = {};

  query = { _id: new ObjectID(productId) };

  PRODUCTS_COLLECTION.deleteOne(query, function (err, result) {
    if (err) {
      json.status = '0';
      json.result = { 'error': 'Error in deleting product!' };
      res.send(json);
    } else {
      json.status = '1';
      json.result = { 'message': 'product deleted successfully.', '_id': productId };
      res.send(json);
    }
  });
});

router.post('/updateProductById/:id', function (req, res, next) {
  console.log('body',req.body);
  var productId = req.params.id;
  var query = {};

  var productObject = {
    'name': req.body.name,
    'price': req.body.price,
    'productImageUrl': req.body.productImageUrl,
    'category': req.body.category,
  };


  query = {
    $set: productObject
  };

    PRODUCTS_COLLECTION.update(query, function (error, result) {
      if (error) {
        json.status = '0';
        json.result = { 'error': 'Error in updating product!' };
        res.send(json);
      } else {
        json.status = '1';
        json.result = { 'message': 'product updated successfully.', '_id': productId };
        res.send(json);
      }
    });
});

router.get('/getProductById/:id', function(req, res, next){
  var productId = req.params.id;
  console.log('productId',productId);
  var query = {};

  query = {_id:new ObjectID(productId)};

  PRODUCTS_COLLECTION.findOne(query, function(producterror, product){
    if (!product) {
      json.status = '0';
      json.result = { 'error': 'product  not found!.', '_id': productId };
      res.send(json);
    }
     else {
      json.status = '1';
      json.result = { 'message': 'product found successfully.', 'product': product };
      res.send(json);
     }
  });
});

module.exports = router;
