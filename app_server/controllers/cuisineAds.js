/* GET 'home' page */
module.exports.homelist = function(req, res){
 res.render('cuisines-list', { title: 'Home' });
};
/* GET 'cuisine info' page */
module.exports.cuisineInfo = function(req, res){
 res.render('cuisine-info', { title: 'Cuisine info' });
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res){
 res.render('cuisine-review-form', { title: 'Add review' });
};

