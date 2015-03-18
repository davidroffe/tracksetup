angular.module('tsApp').controller('guestCtrl', ['$scope', '$http', '$location', '$cookies', '$timeout', function($scope, $http, $location, $cookies, $timeout){

	$scope.login = {};
	$scope.signUp = {};

	$scope.show = true;

	//switch between login or signup view
	$scope.showForm = function(){
		$scope.show = !$scope.show;
	};

	$scope.login.submit = function(){

		$scope.login.errorMessage = [];

		if(($scope.login.email === undefined) || ($scope.login.email === '')){

			$scope.login.errorMessage.push('Please enter an email.');

		}
		if(($scope.login.password === undefined) || ($scope.login.password === '')){

			$scope.login.errorMessage.push('Please enter a password.');

		}
		if($scope.login.errorMessage.length === 0){
			$http.post('/api/login', {
				email: $scope.login.email,
				password: $scope.login.password
			})
			.success(function(data, status){
				$timeout(function(){$location.path('/panel/cars');}, 100);
			})
			.error(function(data, status){
				$scope.login.errorMessage = data.message;
			});
		}
	};

	$scope.signUp.submit = function(){

		$scope.signUp.errorMessage = [];

		if(($scope.signUp.email === undefined) || ($scope.signUp.email === '')){

			$scope.signUp.errorMessage.push('Please enter an email.');

		}
		if(($scope.signUp.password === undefined) || ($scope.signUp.password === '')){

			$scope.signUp.errorMessage.push('Please enter a password.');

		}
		if($scope.signUp.password !== $scope.signUp.passwordConfirm){

				$scope.signUp.errorMessage.push('Passwords do not match.');

		}
		if(($scope.signUp.password.length < 8)){
			$scope.signUp.errorMessage.push('Password must be at least 8 characters.');
		}
		if($scope.signUp.errorMessage.length === 0){
			$http.post('/api/signup', {
				email: $scope.signUp.email,
				password: $scope.signUp.password
			})
			.success(function(data, status){
				$timeout(function(){$location.path('/panel/cars')}, 100);
			})
			.error(function(data, status){
				$scope.signUp.errorMessage = data.message;
			});
		}
	};
}]);