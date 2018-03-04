(function () {

  angular
    .module('cribCuisineApp')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope'];
  function homeCtrl ($scope) {
    var vm = this;
    vm.pageHeader = {
      title: 'cribCuisine',
      strapline: 'Find places to eat healthy yummy cuisne near you!'
    };
    vm.sidebar = {
      content: "Looking for all healthy, cheap and exotic Dinner? Make a wish :)"
    };
    vm.message = "Checking your location";

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

  }

})();