angular.module('tsApp', ['ui.router', 'ui.bootstrap', 'ngCookies', 'ngResource'])

.factory('$Data', ['$resource', function($resource){
  return $resource('/api/:data/:action/:id');
}])

.factory('Auth', ['$cookies', '$http', '$location', function($cookies, $http, $location){

  return {

    guestUrl: 'https://tracksetup.info/',

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
      if(!($cookies.hasOwnProperty('auth')) && newUrl.indexOf(this.guestUrl + 'panel') === 0 ){
				console.log('Unauthorized!');
        event.preventDefault();
        $location.path('/');
      } else if($cookies.auth && newUrl === this.guestUrl){
        event.preventDefault();
      }
    }
  };

}])

.factory('ModalHelper', ['$rootScope', '$location', function($rootScope){
    return {
      disableNav: function(cancel) {
        return $rootScope.$on('$locationChangeStart', function(event, newUrl, oldUrl){
          console.log('test');
          event.preventDefault();
          cancel();
          this.handlerRemover();
        }.bind(this));
      }
    }
}])

.config(function($locationProvider){
  $locationProvider
  .html5Mode({
    enabled: true,
    //requireBase: false
  });
})

.config(function($stateProvider, $urlRouterProvider){
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
  })
	.state('panel.settings', {
    url:'/settings',
    controller: 'settingsCtrl',
    templateUrl: 'views/settingsView.html'
  });

  $urlRouterProvider
  .otherwise('/404');

})

//Check for authorization on bootup
.run(['$rootScope', 'Auth', '$location', '$timeout', function($rootScope, Auth, $location, $timeout){
    Auth.uri();  
    $rootScope.$on('$locationChangeStart', Auth.uriEventHandler.bind(Auth));
}]);

