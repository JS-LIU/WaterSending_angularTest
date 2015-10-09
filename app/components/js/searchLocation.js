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
    return {
        search:autoSearch,
    }

});


main.controller('getLocation',function($rootScope,$scope,searchLocation,get_location,logMsg,mainPost,$http){

    $rootScope.GETVALUE = function(e){
        var keywords = $(e.target).val();
        searchLocation.search(keywords,$scope);
    }
    $scope.selectAddress = function(i){
        $rootScope.LNGLAT = {
            positionX:$scope.location[i].lnglat[0],
            positionY:$scope.location[i].lnglat[1],
            addressInfo:$scope.location[i].loc,
            districtId:'this is a no use parameter'
        }
        //  自定义地区
        //$rootScope.ADDRESS = $scope.location[i].loc;
        $rootScope.ADDRESS = $scope.location[i].loc;
        //  当前所在地
        var curd = [$scope.location[i].lnglat[0],$scope.location[i].lnglat[1]];
        //  请求商店
        //var requestPageInfo = {
        //    pageSize:5,
        //    pageNo:1
        //}
        //var data = {
        //    accessInfo:logMsg.accessInfo,
        //    positionInfo:$rootScope.ADDRESS,
        //    requestPageInfo: requestPageInfo
        //}
        //mainPost.postData(data,path).success(function(data){
        //    console.log(data);
        //    $rootScope.SHOPLIST = shopList;
        //    requestPageInfo.pageNo += 1;
        //});

        //  本地模拟
        $http.get('components/data/shopList.json').success(function(data){
            var shopList = data['shopList'];
            $rootScope.SHOPLIST = shopList;
            $rootScope.NEARLIST_SHOP = shopList[0];
            console.log(shopList);
            //  在地图中标记出来商店位置
            for(var i = 0,len = shopList.length; i < len ; i++){
                var lnglat = [shopList[i]["xAxis"],shopList[i]["yAxis"]];
                get_location.paintshopPoint(i,lnglat,curd);
            }
        });

        window.location.href="#/";
    }
});
