var mongoose = require('mongoose');
var models = require('../models/cuisines');

var Cus = mongoose.model('Cuisine');
var theEarth = (function() {
  var earthRadius = 6371; // km, miles is 3959

  var getDistanceFromRads = function(rads) {
    return parseFloat(rads * earthRadius);
  };

  var getRadsFromDistance = function(distance) {
    return parseFloat(distance / earthRadius);
  };

  return {
    getDistanceFromRads: getDistanceFromRads,
    getRadsFromDistance: getRadsFromDistance
  };
})();


var sendJSONresponse = function(res, status, content) {
  //console.log("Problem here");
  res.status(status);
  
  res.json(content);
};


module.exports.cuisinesCreate = function (req, res) {
 sendJsonResponse(res, 200, {"status" : "success"});
};


module.exports.cuisinesListByDistance = function (req, res) {
 sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.cuisinesReadOne = function (req, res) {
 
 console.log('Finding location details', req.params);
  if (req.params && req.params.cuisineid) {
    Cus
      .findById(req.params.cuisineid)
      .exec(function(err, cuisine) {
        if (!cuisine) {
          sendJSONresponse(res, 404, {
            "message": "Cuisineid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(cuisine);
        sendJSONresponse(res, 200, cuisine);
      });
  } else {
    console.log('No locationid specified');
    sendJSONresponse(res, 404, {
      "message": "No locationid in request"
    });
  }
};


module.exports.cuisinesUpdateOne = function (req, res) {
 sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.cuisinesDeleteOne= function (req, res) {
 sendJsonResponse(res, 200, {"status" : "success"});
};