/**
 * Created by 殿麒 on 2015/11/2.
 */
purchase.controller('headerModel',function($rootScope,$scope,getSelfUrl){
    $rootScope.SHAREBTN = true;
    $scope.isShare = function(){
        $rootScope.SHAREBTN = false;
    }
    $rootScope.HIDESHARE = function(){
        $rootScope.SHAREBTN = true;
    }
    var lastUrl = getSelfUrl.myUrl;
    var host = window.location.host;
    var contextPath = document.location.pathname;
    var index = contextPath.substr(1).indexOf("/");
    contextPath = contextPath.substr(0, index + 1);

    var url = "http://" + host + contextPath;
    $scope.lastUrl = lastUrl || url + '/app/06-main.html';
})