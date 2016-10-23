var modules = [
	'HomeModule',
]

var app = angular.module('Thirsty', modules, function($interpolateProvider){
	$interpolateProvider.startSymbol('<%');
	$interpolateProvider.endSymbol('%>');
})