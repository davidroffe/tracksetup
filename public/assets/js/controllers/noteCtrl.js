angular.module('tsApp').controller('noteCtrl', ['$scope', '$http', '$stateParams', '$modalInstance', function($scope, $http, $stateParams, $modalInstance){
	$scope.carId = $stateParams.id;


	$scope.note.add.cancel = function() {
		console.log($scope.test);
		$modalInstance.close();

	};
	/*
	$scope.note.add.submit = function(){
		$http.post('/api/addnote/' + $scope.carId, $scope.newNote)
		.success(function(data){
			$modalInstance.close();
		})
		.error(function(data, status){
			console.log('Could not add note: ' + data.message);
		});
	};

	$scope.note.add.cancel = function() {
		$modalInstance.close();
	};*/
}]);