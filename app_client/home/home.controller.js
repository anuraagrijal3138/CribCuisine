(function () {
angular
	.module('cribCuisineApp')
	.controller('homeCtrl', homeCtrl);

function homCtrl ($scope){
	var vm = this;
	vm.pageHeader ={
		title: 'cribCuisine'
		strapline: 'Find places to eat authenitic dorm-cooked meal!'
	};
	vm.sidebar = {
		content: "Looking for delicious food etc.. etc.."
	};
}
})();