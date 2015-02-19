angular.module('tsApp').controller('cardCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams){
	//implement a service to make a get request and grab the card data for the card id in the URI
	$http.get('/api/getcard/' + $stateParams.id)
	.success(function(data){
		$scope.card = data;
		console.log(data.toe);
	})
	.error(function(data, err){
		console.log("Can't fetch data because of: " + err);
	});
	/*$scope.card = {
					id: '634',
					engine: {},
					suspension: {
						camber: {
							fl: -1,
							fr: -1,
							rl: -1.5,
							rr: -1.5,
						},
						toe: {
							front: 0,
							rear: 0
						},
						caster: {
							left: 0,
							right: 0
						},
						spring: {
							length: {
								fl: 5,
								fr: 5,
								rl: 6,
								rr: 6
							},
							rate: {
								fl: 350,
								fr: 350,
								rl: 750,
								rr: 750
							}
						}
					},
					notes: {
						'intake notes' : 'Intake came loose, get new clamp.'
					}
				};*/
}]);