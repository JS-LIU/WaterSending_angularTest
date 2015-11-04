/**
 * Created by 殿麒 on 2015/10/15.
 */
var waterShop = angular.module('waterShop', ['ngRoute','ngTouch','ngCookies']);

waterShop.config(function($routeProvider,$locationProvider) {
    $locationProvider.html5mode = false;
    $locationProvider.hashPrefix = '!';
    $routeProvider.when('/',{
        templateUrl:'08-01-waterShopDetails.html'
    });
});
