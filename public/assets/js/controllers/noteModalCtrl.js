angular.module('tsApp').controller('addNoteCtrl', ['$scope', '$http', '$stateParams', '$modalInstance', function($scope, $http, $stateParams, $modalInstance){
	$scope.carId = $stateParams.id;

	$scope.ok = function() {
		$modalInstance.close();
	}
}]);