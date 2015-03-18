angular.module('tsApp')
.controller('panelCtrl', ['$scope', '$http', '$location', '$cookies', '$timeout', '$resource', function($scope, $http, $location, $cookies, $timeout, $resource){
  
  var User = $resource('/api/user');
  var user = User.get(function(data){
    $scope.user = data;
  });


  $scope.logOut = function() {
    $http.get('/api/logout')
    .success(function(){
      delete $cookies.auth;
      $timeout(function(){$location.path('/')}, 100);
    })
    .error(function(data, status){
      console.log('error is ' + status);
    });
    
  };
}]);
