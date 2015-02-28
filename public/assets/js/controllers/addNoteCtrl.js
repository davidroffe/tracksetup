angular.module('tsApp').controller('addNoteCtrl', ['$scope', '$Data', '$stateParams', '$modalInstance', function($scope, $Data, $stateParams, $modalInstance){
	$scope.carId = $stateParams.id;
	$scope.note.new = {};


	$scope.note.add.submit = function(){

		$scope.note.add.error = [];

		if($scope.note.new.title === '' || $scope.note.new.title === undefined) $scope.note.add.error[0] = 'error';
		if($scope.note.new.message === '' || $scope.note.new.message === undefined) $scope.note.add.error[1] = 'error';

		if($scope.note.add.error.length < 1){

			$Data.save({data: 'note', action: 'add', id: $scope.carId}, $scope.note.new, function(data){

				$Data.query({data: 'note', action: 'getmulti', id: $scope.carId}, function(data){
					$scope.note.data = data;

					$scope.note.dataCopy = data.slice();

					for (var i = 0; i < $scope.note.data.length; i++){ 
						$scope.note.del.chkBox[i] = 'check-sel fa fa-close';
					}
				});

				$modalInstance.close();

			});
		}
	};


	$scope.note.add.cancel = function() {
		console.log($scope.test);
		$modalInstance.close();

	};

}]);