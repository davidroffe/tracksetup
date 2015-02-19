angular.module('tsApp').controller('editTitleCtrl', ['$scope', '$http', '$location','$modalInstance', function($scope, $http, $location, $modalInstance) {
	$scope.submit = function() {
	};
	
	$scope.cancel = function() {
		$modalInstance.close();
	};

}]);