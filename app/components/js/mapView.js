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
    $rootScope.isshow = true;
    $scope.address = '正在定位...';
    //  1.绘制地图 自动定位当前位置 todo 改成$rootScope;
    if($cookieStore.get('lnglatXY') == undefined || $('.amap-marker-content').length == 0){
        //  绘制地图 填写当前位置
        get_location.paintMap($scope);
        //  获取最近商店
        $scope.$watch('lnglat',function(){
            if($scope.lnglat != undefined){
                //  请求数据
                //  var data = $scope.lnglat;
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

                    //  为点击【我要订水】绑定事件
                    $scope.postShopInfo = function(){
                        //  保存选中的【商店信息】
                        $cookieStore.put('shopInfo',shopInfo);
                        //  保存位置信息 todo

                        window.location.href = '04-goodsList.html';
                    }
                });
            }
        })
    }








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
