/**
 * Created by 殿麒 on 2015/10/12.
 */
purchase.factory("get_location",function(){
    /*
     *  代码来源：http://lbs.amap.com/api/javascript-api/example/p/1602-2/
     *  作用：得到当前位置
     */
    var map = new AMap.Map('mapContainer', {
        resizeEnable: true,
        zoom:16
    });

    function geocoder(lnglatXY,$scope) {
        map.setCenter(lnglatXY);
        var MGeocoder;
        //加载地理编码插件
        AMap.service(["AMap.Geocoder"], function() {
            MGeocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            });
            //逆地理编码
            MGeocoder.getAddress(lnglatXY, function(status,result) {
                if (status === 'complete' && result.info === 'OK') {
                    geocoder_CallBack(result,$scope,lnglatXY);
                }
            });
        });
    }

    function geocoder_CallBack(data,$scope,lnglatXY) {
        //返回地址描述
        $scope.address = data.regeocode.formattedAddress;
        console.log($scope.address);
        autoSearch($scope.address,$scope);
        $scope.lnglat = {
            positionX:lnglatXY[0],
            positionY:lnglatXY[1],
            addressInfo:$scope.address,
            districtId:'this is a no use parameter'
        };
        //$scope.$apply();
    }

    /*
     *   代码来源：http://lbs.amap.com/api/javascript-api/example/i/0902-2/
     *   作用：监听地图【拖拽】事件
     *   代码来源：http://localhost:63342/WaterSending_angularTest/app/06-main.html#/
     *   作用：获取【当前地图中心经纬度】
     */
    function changeMyPosition(func){
        map.on('dragend',function(){
            var nowLocation = [map.getCenter().lng,map.getCenter().lat];
            func(nowLocation);

            setTimeout(function(){
                var correct = [map.getCenter().lng,map.getCenter().lat];
                if(correct[0] != nowLocation[0] || correct[1] != nowLocation[1]){
                    func(correct);
                    console.log('矫正惯性误差成功...');
                }
            },2000);
        })
    }

    //输入提示
    function autoSearch(keywords,$scope){
        var auto;
        //加载输入提示插件
        AMap.service(["AMap.Autocomplete"], function() {
            var autoOptions = {
                city: "" //城市，默认全国
            };
            auto = new AMap.Autocomplete(autoOptions);
            console.log(keywords);
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
        getLocation:geocoder,
        resetMyPosition:changeMyPosition,
        search:autoSearch
    }
});

purchase.controller('changeLocInfo',function($scope,get_location,$cookieStore){
    var lnglat = $cookieStore.get('lnglatXY');
    var d = [lnglat.positionX,lnglat.positionY];
    get_location.getLocation(d,$scope);

    //  时时获取地理位置
    get_location.resetMyPosition(function(location){
        //  周边位置
        get_location.getLocation(location,$scope);
    });

    //  搜索位置
    $scope.getmyloc = function(e){
        var keywords = $(e.target).val();
        get_location.search(keywords,$scope);
    }
});