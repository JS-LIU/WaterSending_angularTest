/**
 * Created by 殿麒 on 2015/8/23.
 */

var main = angular.module('myApp', ['ngRoute','ngTouch','ngCookies']);

main.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/',{
        templateUrl:'06-01-map.html'
    }).when('/order',{
        templateUrl:'06-02-order.html',
        controller:hideMap
    }).when('/my',{
        templateUrl:'06-03-my.html',
        controller:hideMap
    }).when('/customLocation',{
        templateUrl:'06-04-customLocation.html',
        controller:hideMap
    }).when('/shopList',{
        templateUrl:'06-05-shopList.html',
        controller:hideMap
    })
}]);


function hideMap($rootScope){
    $rootScope.SHOWMAP = true;
}