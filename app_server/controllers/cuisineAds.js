/* GET 'home' page */
module.exports.homelist = function(req, res){
 res.render('index', { title: 'Home' });
};
/* GET 'cuisine info' page */
module.exports.cuisineInfo = function(req, res){
 res.render('index', { title: 'Cuisine info' });
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res){
 res.render('index', { title: 'Add review' });
};

