/**
 * Created by 殿麒 on 2015/10/12.
 */
purchase.factory("get_location",function(){
    /*
     *  代码来源：http://lbs.amap.com/api/javascript-api/example/p/1602-2/
     *  作用：得到当前位置
     */

    function geocoder(lnglatXY,$scope) {
        $scope.map = new AMap.Map("mapContainer", {
            resizeEnable: true,
            center: lnglatXY,       //地图中心点
            zoom: 16                //地图显示的缩放级别
        });
        var MGeocoder;
        //加载地理编码插件
        AMap.service(["AMap.Geocoder"], function() {
            MGeocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            });
            //逆地理编码
            MGeocoder.getAddress(lnglatXY, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    geocoder_CallBack(result,lnglatXY,$scope);
                }
            });
        });
    }

    function geocoder_CallBack(data,lnglatXY,$scope) {
        //返回地址描述
        $scope.address = data.regeocode.formattedAddress;
        console.log($scope.address);
        $scope.LNGLAT = {
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
    function changeMyPosition($scope,func){
        $scope.map.on('dragend',function(){
            var nowLocation = [$scope.map.getCenter().lng,$scope.map.getCenter().lat];
            console.log(nowLocation);
            func(nowLocation);

            setTimeout(function(){
                var correct = [$scope.map.getCenter().lng,$scope.map.getCenter().lat];
                if(correct[0] != nowLocation[0] || correct[1] != nowLocation[1]){
                    func(correct);
                    console.log('矫正惯性误差成功...');
                }
            },2000);
        })
    }

    return {
        getLocation:geocoder,
        resetMyPosition:changeMyPosition
    }
});

purchase.controller('changeLocInfo',function($scope,get_location,$cookieStore){
    var lnglat = $cookieStore.get('lnglatXY');
    var d = [lnglat.positionX,lnglat.positionY];
    get_location.getLocation(d,$scope);

    get_location.resetMyPosition($scope,function(location){
        //console.log(location);
        //get_location.getLocation(location,$scope);
    })
});