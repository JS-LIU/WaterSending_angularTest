//  代码来源：http://lbs.amap.com/api/javascript-api/example/l/1207-2/
main.factory('searchLocation',function($rootScope){

    //输入提示
    function autoSearch(keywords,$scope){
        var auto;
        //加载输入提示插件
        AMap.service(["AMap.Autocomplete"], function() {
            var autoOptions = {
                city: "" //城市，默认全国
            };
            auto = new AMap.Autocomplete(autoOptions);
            //查询成功时返回查询结果
            if (keywords.length > 0) {
                auto.search(keywords, function(status, result) {
                    $scope.location = autocomplete_CallBack(result);
                    $scope.$apply();
                });
            }
        });
    }

    //输出输入提示结果的回调函数
    function autocomplete_CallBack(data) {
        var location = [];
        var tipArr = data.tips;

        if (tipArr && tipArr.length > 0) {
            for (var i = 0; i < tipArr.length; i++) {
                var lng = tipArr[i].location.lng;
                var lat = tipArr[i].location.lat;
                var lnglat = [lng,lat];
                var obj = {loc:tipArr[i].name,lnglat:lnglat};
                location.push(obj);
            }
            return location;
        } else {
            console.log('error');
        }
    }

    function setCenter(curd){
        $rootScope.map.setCenter(curd);
    }
    return {
        search:autoSearch,
        setMapCenter:setCenter
    }
});


main.controller('getLocation',function($rootScope,$scope,searchLocation,get_location,logMsg,mainPost,getAccessInfo){

    $rootScope.GETVALUE = function(e){
        var keywords = $(e.target).val();
        searchLocation.search(keywords,$scope);
    }

    $scope.selectAddress = function(i){
        var path = 'shopList/shop';
        //  页数 每页条数
        var requestPageInfo = {
            pageSize:5,
            pageNo:1
        }
        //  自定义地区
        $rootScope.ADDRESS = $scope.location[i].loc;
        //  当前所在地
        var curd = [$scope.location[i].lnglat[0],$scope.location[i].lnglat[1]];
        searchLocation.setMapCenter(curd);
        //  绑定城市ID 请求数据
        $rootScope.map.getCity(function(data){
            var citycode = data.citycode;

            $rootScope.LNGLAT = {
                position_x:$scope.location[i].lnglat[0],
                position_y:$scope.location[i].lnglat[1],
                addressInfo:$scope.location[i].loc,
                districtId:citycode
            }
            var data = {
                accessInfo:getAccessInfo.accessInfo,
                positionInfo:$rootScope.LNGLAT,
                requestPageInfo: requestPageInfo,
                x_dpi:'640',
                sign :'meng wei'
            }

            mainPost.postData(data,path).success(function(data){
                var shopList = data['shopList'];

                //  在地图中标记出来商店位置
                for(var i = 0,len = shopList.length; i < len ; i++){
                    shopList[i].distance = parseInt(shopList[i].distance);
                    var shoplnglat = [shopList[i]["xAxis"],shopList[i]["yAxis"]];
                    get_location.paintshopPoint(i,shoplnglat,curd);
                }
                $rootScope.SHOPLIST = shopList;
                $rootScope.NEARLIST_SHOP = shopList[0];
                console.log($rootScope.NEARLIST_SHOP)
                requestPageInfo.pageNo += 1;
            });
        })

        window.location.href="#/";
    }
});
