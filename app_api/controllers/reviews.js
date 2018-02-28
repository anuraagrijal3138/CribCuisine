var mongoose = require('mongoose');
//var Cus = mongoose.model('Cusalcuisine');
//first we define the schema for subdocuments
//I am copying the contents of ../models/cuisines.js as I am not able to follow the book example of directly creating a model without giving reference to shema


var Cus = mongoose.model('Cuisine');


var sendJsonResponse = function(res, status, content) {
 res.status(status);
 res.json(content);
};

module.exports.reviewsCreate = function (req, res) {
 if (req.params.cuisineid) {
     Cus
       .findById(req.params.cuisineid)
       .select('reviews')
       .exec(
         function(err, cuisine) {
           if (err) {
             sendJSONresponse(res, 400, err);
           } else {
             doAddReview(req, res, cuisine);
           }
         }
     );
   } else {
     sendJSONresponse(res, 404, {
       "message": "Not found, cuisineid required"
     });
   }
};

var doAddReview = function(req, res, cuisine) {
  if (!cuisine) {
    sendJSONresponse(res, 404, "cuisineid not found");
  } else {
    cuisine.reviews.push({
      author: req.body.author,
      rating: req.body.rating,
      reviewText: req.body.reviewText
    });
    cuisine.save(function(err, cuisine) {
      var thisReview;
      if (err) {
        sendJSONresponse(res, 400, err);
      } else {
        updateAverageRating(cuisine._id);
        thisReview = cuisine.reviews[cuisine.reviews.length - 1];
        sendJSONresponse(res, 201, thisReview);
      }
    });
  }
};

var updateAverageRating = function(cuisineid) {
  console.log("Update rating average for", cuisineid);
  Cus
    .findById(cuisineid)
    .select('reviews')
    .exec(
      function(err, cuisine) {
        if (!err) {
          doSetAverageRating(cuisine);
        }
      });
};

var doSetAverageRating = function(cuisine) {
  var i, reviewCount, ratingAverage, ratingTotal;
  if (cuisine.reviews && cuisine.reviews.length > 0) {
    reviewCount = cuisine.reviews.length;
    ratingTotal = 0;
    for (i = 0; i < reviewCount; i++) {
      ratingTotal = ratingTotal + cuisine.reviews[i].rating;
    }
    ratingAverage = parseInt(ratingTotal / reviewCount, 10);
    cuisine.rating = ratingAverage;
    cuisine.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Average rating updated to", ratingAverage);
      }
    });
  }
};

module.exports.reviewsUpdateOne = function(req, res) {
  if (!req.params.cuisineid || !req.params.reviewid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, cuisineid and reviewid are both required"
    });
    return;
  }
  Cus
    .findById(req.params.cuisineid)
    .select('reviews')
    .exec(
      function(err, cuisine) {
        var thisReview;
        if (!cuisine) {
          sendJSONresponse(res, 404, {
            "message": "cuisineid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        if (cuisine.reviews && cuisine.reviews.length > 0) {
          thisReview = cuisine.reviews.id(req.params.reviewid);
          if (!thisReview) {
            sendJSONresponse(res, 404, {
              "message": "reviewid not found"
            });
          } else {
            thisReview.author = req.body.author;
            thisReview.rating = req.body.rating;
            thisReview.reviewText = req.body.reviewText;
            cuisine.save(function(err, cuisine) {
              if (err) {
                sendJSONresponse(res, 404, err);
              } else {
                updateAverageRating(cuisine._id);
                sendJSONresponse(res, 200, thisReview);
              }
            });
          }
        } else {
          sendJSONresponse(res, 404, {
            "message": "No review to update"
          });
        }
      }
  );
};

module.exports.reviewsReadOne = function(req, res) {
  console.log("Getting single review");
  if (req.params && req.params.cuisineid && req.params.reviewid) {
    Cus
      .findById(req.params.cuisineid)
      .select('name reviews')
      .exec(
        function(err, cuisine) {
          console.log(cuisine);
          var response, review;
          if (!cuisine) {
            sendJSONresponse(res, 404, {
              "message": "cuisineid not found"
            });
            return;
          } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
          }
          if (cuisine.reviews && cuisine.reviews.length > 0) {
            review = cuisine.reviews.id(req.params.reviewid);
            if (!review) {
              sendJSONresponse(res, 404, {
                "message": "reviewid not found"
              });
            } else {
              response = {
                cuisine: {
                  name: cuisine.name,
                  id: req.params.cuisineid
                },
                review: review
              };
              sendJSONresponse(res, 200, response);
            }
          } else {
            sendJSONresponse(res, 404, {
              "message": "No reviews found"
            });
          }
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "Not found, cuisineid and reviewid are both required"
    });
  }
};

// app.delete('/api/cuisines/:cuisineid/reviews/:reviewid'
module.exports.reviewsDeleteOne = function(req, res) {
  if (!req.params.cuisineid || !req.params.reviewid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, cuisineid and reviewid are both required"
    });
    return;
  }
  Cus
    .findById(req.params.cuisineid)
    .select('reviews')
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
        if (cuisine.reviews && cuisine.reviews.length > 0) {
          if (!cuisine.reviews.id(req.params.reviewid)) {
            sendJSONresponse(res, 404, {
              "message": "reviewid not found"
            });
          } else {
            cuisine.reviews.id(req.params.reviewid).remove();
            cuisine.save(function(err) {
              if (err) {
                sendJSONresponse(res, 404, err);
              } else {
                updateAverageRating(cuisine._id);
                sendJSONresponse(res, 204, null);
              }
            });
          }
        } else {
          sendJSONresponse(res, 404, {
            "message": "No review to delete"
          });
        }
      }
  );
};