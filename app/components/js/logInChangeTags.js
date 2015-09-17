/**
 * Created by µочи on 2015/9/17.
 */
var logIn = angular.module('myLog', ['ngRoute']);

logIn.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/',{
        templateUrl:'07-01-logIn.html'
    }).when('/findPassword',{
    })
}]);