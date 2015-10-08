/**
 * Created by 殿麒 on 2015/8/31.
 */

main.controller("cutView",function($scope,$rootScope){
    $rootScope.SHOWMAP = true;
    $scope.toggleView = function(){
        $rootScope.SHOWMAP = !$rootScope.SHOWMAP;
    }
});

main.controller("mapView",function($rootScope,$scope,$cookieStore,$swipe,get_location,mainPost,logMsg,$http){
    $cookieStore.remove('lnglatXY');


    $rootScope.isshow = true;
    //  1.绘制地图 自动定位当前位置
    if($rootScope.LNGLAT == undefined){
        //  绘制地图 填写当前位置
        get_location.paintMap($rootScope);
        //  获取最近商店
        $rootScope.$watch('LNGLAT',function(){
            if($rootScope.LNGLAT != undefined){
                //  请求数据
                //var path = '/shopList/shop';  //  地址
                //var requestPageInfo = {       //  页数 每页条数
                //    pageSize:5,
                //    pageNo:1
                //}
                //var data = {                  //  发送data
                //    accessInfo:logMsg.accessInfo,
                //    positionInfo:$rootScope.LNGLAT,
                //    requestPageInfo: requestPageInfo
                //}
                //mainPost.postData(data,path).success(function(data){
                //    console.log(data);
                //    $rootScope.SHOPLIST = shopList;
                //    requestPageInfo.pageNo += 1;
                //});
                var lnglat = [$rootScope.LNGLAT.positionX,$rootScope.LNGLAT.positionY];
                //  本地模拟
                $http.get('components/data/shopList.json').success(function(data){
                    var shopList = data['shopList'];

                    $rootScope.SHOPLIST = shopList;
                    $rootScope.NEARLIST_SHOP = shopList[0];
                    var shopInfo = shopList[0];
                    //  在地图中标记出来商店位置
                    for(var i = 0,len = shopList.length; i < len ; i++){
                        var shoplnglat = [shopList[i]["xAxis"],shopList[i]["yAxis"]];
                        get_location.paintshopPoint(i,shoplnglat);
                    }
                    //  当前位置
                    get_location.myPosition(lnglat);
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
});


main.controller('aa',function($scope,$swipe){
    $swipe.bind($('#mapContainer'),{
        'start': function() {
            console.log(123);
        },
        'move': function() {

        },
        'end': function() {
            console.log(2323);
        }
    })

})
