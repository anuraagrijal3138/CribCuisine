var mongoose = require('mongoose');
var Cus = mongoose.model('Cuisine');

var sendJSONresponse = function(res, status, content) {
  //console.log("Problem here");
  res.status(status);
  
  res.json(content);
};

module.exports.cuisinesCreate = function (req, res) {
 console.log(req.body);
   Cus.create({
     name: req.body.name,
     address: req.body.address,
     hostingTimes: [{
       days: req.body.days1,
       opening: req.body.opening1,
       closing: req.body.closing1,
       closed: req.body.closed1,
     }, {
       days: req.body.days2,
       opening: req.body.opening2,
       closing: req.body.closing2,
       closed: req.body.closed2,
     }]
   }, function(err, cuisine) {
     if (err) {
       console.log(err);
       sendJSONresponse(res, 400, err);
     } else {
       console.log(cuisine);
       sendJSONresponse(res, 201, cuisine);
     }
   });
 };


//module.exports.cuisinesListByDistance = function (req, res) {
// sendJsonResponse(res, 200, {"status" : "success"});
//};

module.exports.cuisinesReadOne = function (req, res) {
 
 console.log('Finding cuisine details', req.params);
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
    console.log('No cuisineid specified');
    sendJSONresponse(res, 404, {
      "message": "No cuisineid in request"
    });
  }
};


module.exports.cuisinesUpdateOne = function (req, res) {
 if (!req.params.cuisineid) {
     sendJSONresponse(res, 404, {
       "message": "Not found, cuisineid is required"
     });
     return;
   }
   Cus
     .findById(req.params.cuisineid)
     .select('-reviews -rating')
     .exec(
       function(err, cuisine) {
         if (!cuisine) {
           sendJSONresponse(res, 404, {
             "message": "cuisineid not found"
           });
           return;
         } else if (err) {
           sendJSONresponse(res, 400, err);
           return;
         }
         cuisine.name = req.body.name;
         cuisine.address = req.body.address;
         cuisine.facilities = req.body.facilities.split(",");
         //cuisine.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
         cuisine.openingTimes = [{
           days: req.body.days1,
           opening: req.body.opening1,
           closing: req.body.closing1,
           closed: req.body.closed1,
         }, {
           days: req.body.days2,
           opening: req.body.opening2,
           closing: req.body.closing2,
           closed: req.body.closed2,
         }];
         cuisine.save(function(err, cuisine) {
           if (err) {
             sendJSONresponse(res, 404, err);
           } else {
             sendJSONresponse(res, 200, cuisine);
       }
       });
       }
   );
};

module.exports.cuisinesDeleteOne= function (req, res) {
 var cuisineid = req.params.cuisineid;
   if (cuisineid) {
     Cus
       .findByIdAndRemove(cuisineid)
       .exec(
         function(err, cuisine) {
           if (err) {
             console.log(err);
             sendJSONresponse(res, 404, err);
             return;
           }
           console.log("cuisine id " + cuisineid + " deleted");
           sendJSONresponse(res, 204, null);
         }
     );
   } else {
     sendJSONresponse(res, 404, {
       "message": "No cuisineid"
     });
   }
};