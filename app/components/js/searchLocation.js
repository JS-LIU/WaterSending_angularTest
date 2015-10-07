//  代码来源：http://lbs.amap.com/api/javascript-api/example/l/1207-2/
main.factory('searchLocation',function(){

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
        search:autoSearch
    }
});

main.controller('getLocation',function($rootScope,$scope,searchLocation){

    $rootScope.GETVALUE = function(e){
        var keywords = $(e.target).val();
        searchLocation.search(keywords,$scope);
    }
    $scope.selectAddress = function(i){
        $rootScope.MYADDRESS = {
            positionX:$scope.location[i].lnglat[0],
            positionY:$scope.location[i].lnglat[1],
            addressInfo:$scope.location[i].loc,
            districtId:'this is a no use parameter'
        }
        window.location.href="#/";
    }
});
