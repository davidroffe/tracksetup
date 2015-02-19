angular.module('tsApp').controller('carSelCtrl', ['$scope', '$http', function($scope, $http) {
		$http.get('/listCars')
		.success(function(data) {
			$scope.cars = data;
			console.log('cars in scope has ' + data.length + ' objects.');
			console.log(data[0].id);
		})
		.error(function(data, status) {
			console.log('error is: ' + status);
		});
}]);