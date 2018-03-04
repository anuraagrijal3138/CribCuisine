
angular.module('cribCuisineApp', ['ngRoute']);
var cuisineListCtrl = function ($scope) {
 $scope.data = {
 	cuisines: [{
 	name: 'Burger Queen',
 	address: '125 High Street, Reading, RG6 1PS',
 	rating: 3,
 	intro: 'hi',
 	_id: '5370a35f2536f6785f8dfb6a'
 },{
 	name: 'Costy',
 	address: '125 High Street, Reading, RG6 1PS',
 	rating: 5,
 	intro: 'me',
 	_id: '5370a35f2536f6785f8dfb6a'
 }]};
};

angular
 .module('cribCuisineApp')
 .controller('cuisineListCtrl', cuisineListCtrl);
