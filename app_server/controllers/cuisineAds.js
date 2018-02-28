/* GET 'home' page */
module.exports.homelist = function(req, res){
 res.render('cuisines-list', { 
    title: 'cribCuisine - find healthy home-cooked meal',
    pageHeader:{
        title: 'cribCuisine',
        strapline: 'Find people who wil offer you healthy home mad cuisines!'
    } ,
    cuisines: [{
     name: 'Momo',
     address: '125 High Street, Reading, RG6 1PPgS',
     rating: 3,
     intro: 'Brief description about food author',
     distance: '100m'
     },{
     name: 'Chow mein',
     address: '125 High Street, Reading, RG6 1PS',
     rating: 4,
     intro: 'Chow mein is one of the popular street-food in Nepal. It has its roots on China',
     distance: '200m'
     },{
     name: 'Bhat',
     address: '125 High Street, Reading, RG6 1PS',
     rating: 2,
     intro: 'Bhaat is main food of Nepal',
      distance: '250m'
    }]

 });
};
/* GET 'cuisine info' page */
module.exports.cuisineInfo = function(req, res){
 res.render('cuisine-info', { 
    title: 'Newari MoMo',
        pageHeader: {
            title: 'Newari Momo'
        },
        sidebar: {
            context: 'is on cibCuisine because you can\'t die without trying momos',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        cuisine: {
            name: 'Newari Food',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 3,
            intro: "You can't die before tasting momos; one cannot live without momos after tasting it",
            coords: {
                lat: 51.455041,
                lng: -0.9690884
            },
            hostingTimes: [{
                days: 'Monday - Friday',
                opening: '7:00am',
                closing: '7:00pm',
                closed: false
            }, {
                days: 'Saturday',
                opening: '8:00am',
                closing: '5:00pm',
                closed: false
            }, {
                days: 'Sunday',
                closed: true
            }],
            reviews: [{
                author: 'Ashim Paudel',
                rating: 5,
                timestamp: '16 July 2018',
                reviewText: 'What a great place. I can\'t say enough good things about it.'
            }, {
                author: 'Anuraag Rijal',
                rating: 3,
                timestamp: '16 June 2018',
                reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
            }]
        }
    });
};


/* GET 'Add review' page */
module.exports.addReview = function(req, res){
 res.render('cuisine-review-form', { 
    title: 'Review NewariMomo on cribCuisine',
        pageHeader: {
            title: 'Review NewariMoMo'
        }
});
};