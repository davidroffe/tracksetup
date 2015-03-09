angular.module('tsApp').controller('carCtrl', ['$scope', '$Data', '$location', '$modal', function($scope, $Data, $location, $modal) {

	$scope.cars = $Data.query({data: 'car', action:'getmulti'});

	$scope.addCarOpen = function() {
		$modal.open({
			templateUrl: 'views/addCarView.html',
			controller: 'addCarCtrl',
			scope: $scope,
			backdrop: 'static'
		});
	};
	
	$scope.delCarOpen = function() {
		$modal.open({
			templateUrl: 'views/delCarView.html',
			controller: 'delCarCtrl',
			scope: $scope,
			backdrop: 'static'
		});
	};

}]);