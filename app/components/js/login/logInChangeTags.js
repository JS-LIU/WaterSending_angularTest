/**
 * Created by 殿麒 on 2015/9/17.
 */
var logIn = angular.module('myLog', ['ngRoute','ngCookies']);

logIn.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/',{
        templateUrl:'07-01-logIn.html',
        controller:'logInRequest'
    }).when('/findPassword',{
        templateUrl:'07-02-findPassword.html'
    }).when('/resetPassword',{
        templateUrl:'07-03-resetPassword.html'
    }).when('/register',{
        templateUrl:'07-04-register.html'
    }).when('/fillCheckcode',{
        templateUrl:'07-05-fillCheckcode.html'
    })
}]);