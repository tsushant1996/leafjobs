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
        type:Number,
    },
    quantity:{
        type:Number,
    },
    createdAt:{
        type:String,
    },
    updatedAt:{
        type:String,
    } 
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
    password:{
        type:String,
    },
    createdAt: {
        type: String
    },
    updatedAt: {
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
    isDelievered:{
        type:Number,

    },
    isAssigned:{
        type:Number
    },
    totalAmount:{
        type:Number,
    },
    products:[],
    status:{
        type:Number
    },
    createdAt:{
        type:String,
    },
    updatedAt:{
        type:String
    },
},{collection:'carts'});

exports.carts = mongoose.model('carts', carts);


//++++ AGENTS SCHEMA +++++++=//

var agents = mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    email: {
        type: String, 
    },
    isFree:{
        type:Number,
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    },
},{collection:'agents'});

exports.agents = mongoose.model('agents', agents);


//+++++++ Delievery Schema ++++++++++//

var delieveries = mongoose.Schema({
    cartId: {
        type: String,
        index: true
    },
    agentId: {
        type: String, 
    },
    expectedTimeline:{
        type:String,
    },
    delieveredTimeline:{
        tye:String,
    },
    status:{
        type:Number,
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    },
},{collection:'delieveries'});





exports.delieveries = mongoose.model('delieveries', delieveries);