var mongoose = require('mongoose');
//var Cus = mongoose.model('Localcuisine');
//first we define the schema for subdocuments
//I am copying the contents of ../models/cuisines.js as I am not able to follow the book example of directly creating a model without giving reference to shema


var Rev = mongoose.model('Cuisine');


var sendJsonResponse = function(res, status, content) {
 res.status(status);
 res.json(content);
};

module.exports.reviewsCreate = function (req, res) {
 sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.reviewsReadOne = function (req, res) {
 sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.reviewsUpdateOne = function (req, res) {
 sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.reviewsDeleteOne = function (req, res) {
 sendJsonResponse(res, 200, {"status" : "success"});
};