/**
 * Created by 殿麒 on 2015/8/31.
 */

main.controller("cutView",function($scope,$rootScope){
    $rootScope.SHOWMAP = true;
    $scope.toggleView = function(){
        $rootScope.SHOWMAP = !$rootScope.SHOWMAP;
    }
});

main.controller("mapView",function($rootScope,$scope,$cookieStore,get_location,mainPost,logMsg,$http){
    //$cookieStore.remove('lnglatXY');
    var addressInfo = $cookieStore.get('lnglatXY');
    var has_MYADDRESS = ($rootScope.MYADDRESS != undefined);
    var has_addressInfo = (addressInfo != undefined);
    if(has_MYADDRESS && has_addressInfo && addressInfo != $rootScope.MYADDRESS.addressInfo){
        $cookieStore.put('lnglatXY',$rootScope.MYADDRESS);
        var data = postShopData($cookieStore.get('lnglatXY'));
        //  请求数据
        //mainPost.postData(data,path).success(function(data){
        //    console.log(data);
        //    $rootScope.SHOPLIST = shopList;
        //    requestPageInfo.pageNo += 1;
        //});
    }

    if($cookieStore.get('lnglatXY') == undefined || $('.amap-marker-content').length == 0){
        get_location.paintMap();
    }

    $rootScope.isshow = true;
    $scope.address = '正在定位...';

    var t = setInterval(function(){

        if($cookieStore.get('lnglatXY') != undefined){
            $scope.address = $cookieStore.get('lnglatXY').addressInfo;
            var data = postShopData($cookieStore.get('lnglatXY'));
            //  请求数据
            //mainPost.postData(data,path).success(function(data){
            //    console.log(data);
            //    $rootScope.SHOPLIST = shopList;
            //    requestPageInfo.pageNo += 1;
            //});

            //  本地模拟
            $http.get('components/data/shopList.json').success(function(data){
                var shopList = data['shopList'];
                $rootScope.SHOPLIST = shopList;
                $scope.nearlist_shopList = shopList[0];
                var shopInfo = shopList[0];
                var address = $scope.address; // 送水地址
                $scope.postShopInfo = function(){
                    $cookieStore.put('shopInfo',shopInfo);
                    window.location.href = '04-goodsList.html';
                }
            });
            clearInterval(t);
        }
        $scope.$apply();
    },500);
    $scope.nearlist_shopList = $rootScope.CUSTOMSHOP;


    var requestPageInfo = {
        pageSize:5,
        pageNo:1
    }

    var path = '/shopList/shop';
    function postShopData(positionInfo){
        var data = {
            accessInfo:logMsg.accessInfo,
            positionInfo:positionInfo,
            requestPageInfo: requestPageInfo
        }
        return data;
    }
});
