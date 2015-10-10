/**
 * Created by 殿麒 on 2015/9/21.
 */
var purchase = angular.module('purchase', ['ngRoute','ngCookies']);


purchase.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/',{
        templateUrl:'04-01-goodsList.html',
    }).when('/goodsCart',{
        templateUrl:'04-02-goodsCart.html'
    }).when('/confirmOrder',{
        templateUrl:'04-03-confirmOrder.html'
    })
}]);