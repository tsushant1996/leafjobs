var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;
//+++++ PRODUCT SCHEMA ++++//

var products = new Schema({
    name: {
        type: String,
        index: true
    },
    category: {
        type: String,
    },
    productImageUrl: {
        type: String
    },
    price:{
        type:Number
    }, 
},{collection:'products'});

exports.products = mongoose.model('products', products);

//++++ CATEGORYSCHEMA

var categories = new Schema({
    name: {
        type: String,
        index: true
    }, 
},{collection:'categories'});

exports.categories = mongoose.model('categories', categories);

//+++++ USERSCHEMA ++++//

var users = mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    email: {
        type: String, 
    },
    UserImageUrl: {
        type: String
    },
 
},{collection:'users'});

exports.users = mongoose.model('users', users);

//++++ CARTSCHEMA ++++//

var carts = mongoose.Schema({
    userId: {
        type: String,
        index: true
    },
    products:[], 
 
},{collection:'carts'});

exports.carts = mongoose.model('carts', carts);