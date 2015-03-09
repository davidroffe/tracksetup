angular.module('tsApp').controller('settingsCtrl', ['$scope', '$Data', '$location', '$modal', function($scope, $Data, $location, $modal) {

	$scope.cars = $Data.query({data: 'car', action:'getmulti'});

}]);