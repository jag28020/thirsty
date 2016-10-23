var homeCtr = angular.module('HomeModule', []);

homeCtr.controller('HomeController', ['$scope', '$http', function($scope, $http){


	$scope.search = {}
	$scope.result = {}

	$scope.search = function(){
		console.log(JSON.stringify($scope.venueSearch))
		
		$http({
			method: 'POST',
			data: $scope.venueSearch,
			url: '/api/venue' 
		}).then(function success(response){
			console.log(JSON.stringify(response))
			$scope.result = response.data
			if ($scope.result.confirmation != "success"){
				alert("Venue not found")
			}

		}, function error(response){
			console.log(JSON.stringify(response))
		})
	}

	$scope.init = function(){
		console.log("Home Controller INIT")
	}


}]);
	