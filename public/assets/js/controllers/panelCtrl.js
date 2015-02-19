angular.module('tsApp')
.controller('panelCtrl', ['$scope', '$http', '$location', '$cookies', function($scope, $http, $location, $cookies){
  $http.get('/api/user')
  .success(function(data){
  	$scope.user = angular.fromJson(data);
  	console.log(angular.fromJson(data));
  })
  .error(function(data, status){
  	console.log('error is ' + status);
  });

  $scope.logOut = function() {
    $http.get('/api/logout')
    .success(function(){
      delete $cookies.auth;
      $location.path('/');
    })
    .error(function(data, status){
      console.log('error is ' + status);
    });
    
  };
}]);
