angular.module('tsApp').controller('carCtrl', ['$scope', '$http', '$location', '$modal', function($scope, $http, $location, $modal) {
	$http.get('/api/getcars')
		.success(function(data) {
			$scope.cars = data;
			console.log('cars in scope has ' + data.length + ' objects.');
			console.log(data[0].year);
		})
		.error(function(data, status) {
			console.log('error is: ' + status);
		});

	$scope.addCarOpen = function() {
		$modal.open({
			templateUrl: 'views/addCarView.html',
			controller: 'addCarCtrl',
			backdrop: 'static'
		});
	};

}]);