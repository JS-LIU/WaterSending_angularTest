/**
 * Created by 殿麒 on 2015/11/2.
 */
purchase.controller('headerModel',function($rootScope,$scope){
    $rootScope.SHAREBTN = true;
    $scope.isShare = function(){
        $rootScope.SHAREBTN = false;
    }
    $rootScope.HIDESHARE = function(){
        $rootScope.SHAREBTN = true;
    }
})