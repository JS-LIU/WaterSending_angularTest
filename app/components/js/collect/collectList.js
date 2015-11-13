/**
 * Created by 殿麒 on 2015/11/13.
 */
var collect = angular.module('collect', ['ngRoute','ngCookies']);

//  暂时用不到路由 用了他妈的不好使
//collect.config(['$routeProvider', function($routeProvider) {
//    $routeProvider.when('/',{
//        templateUrl:'05-collectList.html',
//        controller:'collection'
//    })
//}]);


collect.controller('collection',function($scope,$cookieStore,collectPost,getAccessInfo,refreshData){
    var lnglatXY = $cookieStore.get('lnglatXY');
    console.log(lnglatXY);
    var requestPageInfo={
        pageNo:1,
        pageSize:5
    }
    var merchantData = {
        positionInfo:lnglatXY,
        accessInfo:getAccessInfo.loginAccessInfo(),
        sign: 'sign',
        userId:0,
        xAxis:lnglatXY.position_x,
        yAxis:lnglatXY.position_y,
        requestPageInfo:requestPageInfo
    }
    function changePage(pageNo){
        merchantData.requestPageInfo.pageNo = pageNo;
        return merchantData;
    }
    console.log(merchantData);
    var path = "favourite/shop/list"
    collectPost.postData(merchantData,path).success(function(data){
        console.log(data);
        $scope.shopList = data.favourShops;
    });
    refreshData.getMoreData(changePage(2),path,function(getData,merchantData){
        console.log(getData);
        merchantData.requestPageInfo.pageNo++;
    });
});


collect.factory('collectPost',function($http){
    var host = window.location.host;
    var contextPath = document.location.pathname;
    var index = contextPath.substr(1).indexOf("/");
    contextPath = contextPath.substr(0, index + 1);

    var url = "http://" + host + contextPath + '/';
    var postData = function(data,path){
        return $http({
            method:'POST',
            url: url + path,
            data: data,
            headers:{'Content-Type':'application/json'},
        });
    }
    return {
        postData: function(data,path){
            return postData(data,path,'postData');
        }
    }
});
collect.service('getAccessInfo',function($cookieStore){
    var app_secret = hex_md5("5e5cd8e3ccca45c2a5a3b00a5a90cdd5");
    var appKey = "cf385992c3fc46cbaebae2c1dae08653";
    this.accessInfo = {
        app_key:appKey,
        signature:app_secret
    }
    this.loginAccessInfo = function(){
        var access_token = $cookieStore.get('access_token').access_token;
        var access_token_secret = $cookieStore.get('access_token').access_token_secret;
        var accessInfo = {
            app_key:appKey,
            signature:hex_md5("5e5cd8e3ccca45c2a5a3b00a5a90cdd5" + '&' + access_token_secret),
            access_token:access_token
        }
        return accessInfo;
    }
});
collect.service('refreshData',function(collectPost){
    var wH = document.documentElement.clientHeight;
    this.getMoreData = function(data,path,func){
        $(window).scroll(function(){
            var dH = document.body.scrollHeight;
            var overH = document.body.scrollTop;
            if(wH + overH == dH){
                collectPost.postData(data,path).success(function(getData){
                    func(getData,data);
                    dH = document.body.scrollHeight;
                });
            }
        })
    }
});