/**
 * Created by µочи on 2015/8/23.
 */
var changePages = angular.module('main',[]);
changePages.controller('changePages',function($rootScope,$scope){
    $rootScope.wrapShow = true;
    $rootScope.wrapHide = false;
    $scope.showMe = function(target){
        console.log(target);
    }
})