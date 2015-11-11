/**
 * Created by 殿麒 on 2015/8/31.
 */

main.controller("cutView",function($scope,$rootScope){
    $rootScope.SHOWMAP = true;
    $scope.toggleView = function(){
        $rootScope.SHOWMAP = !$rootScope.SHOWMAP;
    }
});

main.controller("mapView",function($rootScope,$scope,$cookieStore,$swipe,get_location,mainPost,getAccessInfo,$http){
    $cookieStore.remove('lnglatXY');
    $cookieStore.remove('shopInfo');


    $rootScope.isshow = true;
    //  1.绘制地图 自动定位当前位置
    if($rootScope.LNGLAT == undefined){
        //  绘制地图 填写当前位置
        get_location.paintMap($rootScope);
        //  获取最近商店
        $rootScope.$watch('LNGLAT',function(){
            if($rootScope.LNGLAT != undefined){
                postNearShops();
            }
        })
    }

    //  移动地图
    get_location.resetMyPosition(function(location){
        get_location.getCurAddress(location);
        postNearShops();
    });

    //  为点击【我要订水】绑定事件
    $scope.postShopInfo = function(){
        //  保存选中的【商店信息】
        if($rootScope.NEARLIST_SHOP != undefined){
            //  保存商店信息
            $cookieStore.put('shopInfo',$rootScope.NEARLIST_SHOP);
            //  保存位置信息
            $cookieStore.put('lnglatXY',$rootScope.LNGLAT);
            window.location.href = '04-goodsList.html';
        }
    }
    //  请求附近水站
    function postNearShops(){
        var path = 'shopList/shop';
        //  页数 每页条数
        var requestPageInfo = {
            pageSize:5,
            pageNo:1
        }
        //  发送data
        var data = {
            accessInfo:getAccessInfo.accessInfo,
            positionInfo:$rootScope.LNGLAT,
            requestPageInfo: requestPageInfo,
            x_dpi:'640',
            sign :'sign'
        }


        var lnglat = [$rootScope.LNGLAT.position_x,$rootScope.LNGLAT.position_y];
        mainPost.postData(data,path).success(function(data){
            var shopList = data['shopList'];

            //  清楚地图中标记的水站
            get_location.clearMaker();
            //  在地图中标记出来商店位置
            for(var i = 0,len = shopList.length; i < len ; i++){
                shopList[i].distance = parseInt(shopList[i].distance);
                var shoplnglat = [shopList[i]["xAxis"],shopList[i]["yAxis"]];
                get_location.paintshopPoint(i,shoplnglat,lnglat);
            }
            $rootScope.SHOPLIST = shopList;
            $rootScope.NEARLIST_SHOP = shopList[0];
        });
    }
});