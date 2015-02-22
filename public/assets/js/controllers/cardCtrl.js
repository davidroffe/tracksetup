angular.module('tsApp').controller('cardCtrl', ['$scope', '$http', '$stateParams', '$modal', function($scope, $http, $stateParams, $modal){
	var cardId = $stateParams.id;

	$http.get('/api/getcard/' + $stateParams.id)
	.success(function(data){
		$scope.card = data;
	})
	.error(function(data, err){
		console.log("Can't fetch data because of: " + err);
	});

	$scope.edit = function(){

		$scope.card.copy = copyObj($scope.card);
		console.log($scope.card.copy.toe);

		var modalInstance = $modal.open({
			templateUrl: '/views/editCardView.html',
			scope: $scope,
			backdrop: 'static'
		});

		$scope.cancel = function() {
			modalInstance.close();
		};

		$scope.submit = function() {

			$scope.error = [];

			console.log($scope.card.copy.name);

			if($scope.card.copy.name === '' || $scope.card.copy.name === undefined) $scope.error[0] = 'error';
			if($scope.card.copy.track === '' || $scope.card.copy.track === undefined) $scope.error[1] = 'error';

			if($scope.error.length < 1){
				$http.post('/api/editcard/' + cardId, $scope.card.copy)
				.success(function(data){

					$http.get('/api/getcard/' + $stateParams.id)
					.success(function(data){
						$scope.card = data;

						$scope.card.copy = copyObj(data);
						console.log($scope.card.copy.toe);
					})
					.error(function(data, err){
						console.log("Can't fetch data because of: " + err);
					});

				})
				.error(function(err){

				});
				console.log('Passed!');
				modalInstance.close();
			}
		};
	};

	var copyObj = function(obj){
		if(obj == null || "object" != typeof obj) return obj;

		var copy = {};

		for (var prop in obj) {

			if(obj.hasOwnProperty(prop)) copy[prop] = copyObj(obj[prop]);
		}

		return copy;
	}
	
}]);