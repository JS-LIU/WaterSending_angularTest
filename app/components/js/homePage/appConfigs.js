/**
 * Created by 殿麒 on 2015/8/23.
 */

var main = angular.module('myApp', ['ngRoute','ngTouch','ngCookies']);

//angular
//    .module('myApp', ['ngRoute',
//        'ngTouch',
//        'ngCookies'
//    ]);

angular.module('myApp')
    .config(routeConfig);

function routeConfig($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'06-01-map.html',
        controller:'mapCtrl',
        controllerAs: 'map'
    }).when('/order',{
        templateUrl:'06-02-order.html',
    }).when('/my',{
        templateUrl:'06-03-my.html',
    }).when('/customLocation',{
        templateUrl:'06-04-customLocation.html',
    }).when('/shopList',{
        templateUrl:'06-05-shopList.html',
    })
}


