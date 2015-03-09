angular.module('tsApp').controller('delCarCtrl', ['$scope', '$Data', '$location','$modalInstance', function($scope, $Data, $location, $modalInstance) {

	$scope.delCar = function(ind) {
		
		if(confirm('Are you sure you want to delete this car?')) {
			
			$Data.delete({data: 'car', action: 'del', id: $scope.cars[ind]._id}, function() {
				
				$scope.cars = $Data.query({data: 'car', action: 'getmulti'});

			});
			
		}
	};
	
	$scope.cancel = function() {
		$modalInstance.close();
	};

}]);