angular.module('tsApp').controller('settingsCtrl', ['$scope', '$Data', '$location', '$modal', function($scope, $Data, $location, $modal) {

	var user = {};
	$scope.delChkClass = 'delete';
	
	$scope.emailMessageClass = $scope.passwordMessageClass = 'settings-message';
	
	$Data.get({data: 'user', action:'getsingle'}, function(data){
		$scope.user = data;	
		
		for (var key in $scope.user) {
			if(key.indexOf('$') === -1)
				user[key] = $scope.user[key];
		}
		
	});
	
	$scope.updateEmail = function(){
		var email = $scope.user.email;
		
		if(email !== '' && email !== undefined && email !== user.email) {
			$Data.save({data: 'user', action: 'updateemail'}, {email:email}, function(){
				user.email = email;
				$scope.emailMessage = 'Email updated successfully.';
				$scope.emailMessageClass += ' show';
			}, function(err){
				$scope.emailMessage = 'Invalid email.';
				$scope.emailMessageClass += ' show';
			});
		}
	};
	
	$scope.updatePassword = function(){
		var password = $scope.password;
		var confPass = $scope.confirmPassword;
		car = password;

		if(password === '' || password === undefined || password.length < 8){
			$scope.passwordMessage = "Must be 8 characters or longer.";
			$scope.passwordMessageClass += ' show';
		} else if(password === confPass){
			$Data.save({data: 'user', action: 'updatepass'}, {password:password}, function(){
				$scope.passwordMessage = 'Password updated successfully.';
				$scope.passwordMessageClass += ' show';
				$scope.password = $scope.confirmPassword = '';
			}, function(err){
				$scope.passwordMessage = 'Invalid Password.';
				$scope.passwordMessageClass += ' show';
				console.log('status: ' + err.status + '\nerror: ' + err.message);
			});
			$scope.passwordMessage = 'Password updated successfully.';
			$scope.passwordMessageClass += ' show';
		} else {
			$scope.passwordMessage = 'Passwords do not match.';
			$scope.passwordMessageClass += ' show';
		}
	};
	
	$scope.deleteAccount = function(){
		if ($scope.delChk) {
			$Data.delete({data: 'user', action: 'del'}, function(){
				$scope.$parent.logout();
			});
		} else {
			$scope.delChkClass = 'delete error';
		}
	};

}]);