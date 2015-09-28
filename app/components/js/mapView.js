/**
 * Created by 殿麒 on 2015/8/31.
 */

main.controller("cutView", ['$scope', '$rootScope',function($scope,$rootScope){
    $scope.toggleView = function(){
        $rootScope.isshow = !$rootScope.isshow;
    }
}]);

main.controller("mapView",function($rootScope,$scope,get_location){
    $rootScope.isshow = true;
    console.log(get_location.address);
});


main.service("get_location",function(){


    var map, geolocation;this.lnglatXY = '',this.address = '';
    /*
     *   代码来源：http://lbs.amap.com/api/javascript-api/example/g/0704-2/
     *   作用：获取【当前经纬度】
     */
    //加载地图，调用浏览器定位服务
    map = new AMap.Map('mapContainer', {
        resizeEnable: true
    });
    map.plugin('AMap.Geolocation', function() {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 100000,      //定位结果缓存0毫秒，默认：0
            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true     //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        map.addControl(geolocation);
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
    });
    function onComplete(data) {
        this.lnglatXY = [data.position.getLng(),data.position.getLat()];
        geocoder(this.lnglatXY);
    }
    //  获取当前位置信息
    (function getCurrentPosition() {
        geolocation.getCurrentPosition();
    })();

    /*
     *  代码来源：http://lbs.amap.com/api/javascript-api/example/p/1602-2/
     *  作用：得到当前位置
     */

    function geocoder(lnglatXY) {
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
                    geocoder_CallBack(result);
                }
            });
        });
    }

    function geocoder_CallBack(data) {
        //返回地址描述
        this.address = data.regeocode.formattedAddress;
        //var $_aHeight = parseFloat($('#a').css('height'));
        //var $_aTop = (44- $_aHeight)/2;
        //$('#a').css({'top':$_aTop + 'px'});
    }

    return {
    }
});



