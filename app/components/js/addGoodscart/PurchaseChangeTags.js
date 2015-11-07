/**
 * Created by 殿麒 on 2015/9/21.
 */
var purchase = angular.module('purchase', ['ngRoute','ngCookies','ngTouch']);


purchase.config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/',{
        templateUrl:'04-01-goodsList.html',
        controller:'goodsListModel'
    }).when('/goodsCart',{
        templateUrl:'04-02-goodsCart.html',
        controller:'goodsCart'
    }).when('/confirmOrder',{
        templateUrl:'04-03-confirmOrder.html',
        controller:'confirmOrder'
    }).when('/receiverAddress',{
        templateUrl:'04-04-receiverAddress.html'
    }).when('/modiAddress',{
        templateUrl:'04-05-modiAddress.html'
    }).when('/changeReceiverLoc',{
        templateUrl:'04-06-changeReceiverLoc.html'
    }).when('/goodsDetails',{
        templateUrl:'04-07-goodsDetails.html'
    })
}]);