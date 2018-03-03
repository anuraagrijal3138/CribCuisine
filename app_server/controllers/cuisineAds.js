var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://crib-cuisine.herokuapp.com";
}

var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else if (status === 500) {
    title = "500, internal server error";
    content = "How embarrassing. There's a problem with our server.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
};

var renderHomepage = function(req, res, responseBody){
  var message;
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No places found nearby";
    }
  }
  res.render('cuisines-list', {
    title: 'CribCuisine',
    pageHeader: {
      title: 'CribCuisine',
      strapline: 'Find people who wil offer you healthy home mad cuisines! '
    },
    sidebar: "Looking for homemade food? Search no more.",
    cuisines: responseBody,
    message: message
  });
};

/* GET 'home' page */
module.exports.homelist = function(req, res){
  var requestOptions, path;
  path = '/api/cuisines';
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      var data;
      data = body;
      if(response.statusCode == 200){
        renderHomepage(req, res, data);
      }
    }
  );
};

var getCuisineInfo = function(req, res, callback){
  var requestOptions, path;
  path = "/api/cuisines/" + req.params.cuisineid;
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body){
      var data = body;
      if(response.statusCode == 200){
        callback(req, res, data);
      }else{
        _showError(req, res, response.statusCode);
      }
    }
    );
};

var renderDetailPage = function (req, res, CusDetail) {
  res.render('cuisine-info', {
    title: CusDetail.name,
    pageHeader: {title: CusDetail.name},
    sidebar: {
      context: 'is on CribCuisine',
      callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
    },
    cuisine: CusDetail,
  });
};

/* GET 'Cuisine info' page */
module.exports.cuisineInfo = function(req, res){
  getCuisineInfo(req, res, function(req,res,responseData){
    renderDetailPage(req, res, responseData);
  });
};

var renderReviewForm = function (req, res, CusDetail) {
  res.render('cuisine-review-form', {
    title: 'Review ' + CusDetail.name + ' on CribCuisine',
    pageHeader: { title: 'Review ' + CusDetail.name },
    error: req.query.err
  });
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res){
  getCuisineInfo(req, res, function(req, res, responseData) {
    renderReviewForm(req, res, responseData);
  });
};

/* POST 'Add review' page */
module.exports.doAddReview = function(req, res){
  //console.log("yo bhayo");
  var requestOptions, path, cuisineid, postdata;
  cuisineid = req.params.cuisineid;
  path = "/api/cuisines/" + cuisineid + '/reviews';
  postdata = {
    author: req.body.name,
    rating: parseInt(req.body.rating, 10),
    reviewText: req.body.review
  };
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : postdata
  };
  if (!postdata.author || !postdata.rating || !postdata.reviewText) {
    res.redirect('/cuisine/' + cuisineid + '/review/new?err=val');
  } else {
    request(
      requestOptions,
      function(err, response, body) {
        if (response.statusCode === 201) {
          res.redirect('/cuisine/' + cuisineid);
        } else if (response.statusCode === 400 && body.name && body.name === "ValidationError" ) {
          res.redirect('/cuisine/' + cuisineid + '/review/new?err=val');
        } else {
          //console.log(body);
          _showError(req, res, response.statusCode);
        }
      }
    );
  }
};