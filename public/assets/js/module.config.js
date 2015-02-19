angular.module('tsApp', ['ui.router', 'ui.bootstrap', 'ngCookies', 'ngResource']);

angular.module('tsApp').config(function($locationProvider){
  $locationProvider
  .html5Mode({
    enabled: true,
    //requireBase: false
  });
});

angular.module('tsApp').factory('Auth', ['$cookies', '$http', '$location', '$resource', function($cookies, $http, $location, $resource){

  var auth = {

    guestUrl: 'http://test.tracksetup.info:8080/',

    uri: function(){
      if($location.path().indexOf('/panel') !== -1){
        if(!$cookies.auth){
          $location.path('/');
        } else {

        }
      }else if($location.path() === '/' && $cookies.auth) {

      } 
    },
    uriEventHandler: function(event, newUrl, oldUrl){
      console.log(newUrl + '\n' + oldUrl);
      if(!$cookies.auth && newUrl.indexOf(auth.guestUrl + 'panel') === 0 ){
        console.log('Unauthorized!');
        event.preventDefault();
        $location.path('/');
      }
    }
  };
  return auth;
}]);

//Check for authorization on bootup
angular.module('tsApp').run(['$rootScope', 'Auth', '$location', '$timeout', function($rootScope, Auth, $location, $timeout){
    Auth.uri;  
    $rootScope.$on('$locationChangeStart', Auth.uriEventHandler);
}]);

angular.module('tsApp').config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('index', {
    url:'/',
    controller: 'guestCtrl',
    templateUrl: 'views/signInView.html'
  })
  .state('404', {
    url:'/404',
    templateUrl: '/views/404.html'
  })
  .state('panel', {
    url:'/panel',
    controller: 'panelCtrl',
    templateUrl: 'views/panelView.html'
  })
  .state('panel.cars', {
    url:'/cars',
    controller: 'carCtrl',
    templateUrl: 'views/listCarView.html'
  })
  .state('panel.addCar', {
    url:'/addcar',
    controller: 'carCtrl',
    templateUrl: 'views/addCarView.html'
  })
  .state('panel.car', {
    url:'/car/:id',
    controller: 'detCarCtrl',
    templateUrl: 'views/carView.html'
  })
  .state('panel.card', {
    url:'/card/:id',
    controller: 'cardCtrl',
    templateUrl: 'views/cardView.html'
  })
  .state('panel.addCard', {
    url:'/addcard/:id',
    controller: 'addCardCtrl',
    templateUrl: 'views/addCardView.html'
  });

  $urlRouterProvider
  .otherwise('/404');

});