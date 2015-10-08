/**
 * Created by 殿麒 on 2015/9/29.
 */
main.factory("get_location",function($cookieStore){
    var map,geolocation,lnglatXY;
    function paintMap($rootScope){
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
                maximumAge: 0,           //定位结果缓存100000毫秒，默认：0
                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                zoomToAccuracy: true     //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
            map.addControl(geolocation);
            AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息

            (function getCurrentPosition() {
                geolocation.getCurrentPosition();
            })();

        });

        function onComplete(data) {
            lnglatXY = [data.position.getLng(),data.position.getLat()];
            //  获取当前位置信息
            geocoder(lnglatXY);
        }

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
            $rootScope.ADDRESS = data.regeocode.formattedAddress;
            $rootScope.LNGLAT = {
                positionX:lnglatXY[0],
                positionY:lnglatXY[1],
                addressInfo:$rootScope.ADDRESS,
                districtId:'this is a no use parameter'
            };
            $rootScope.$apply();
        }
    }
    function shopPoint(i,d){
        var markerOption = {
            map: map,
            icon:"http://webapi.amap.com/theme/v1.3/markers/n/mark_b"+(i+1)+".png",
            position: d
        };
        var mar = new AMap.Marker(markerOption);
        map.setFitView();
    }

    function myPosition(d){
        var marker = new AMap.Marker({
            position: d
        });
        marker.setMap(map);
        marker.setLabel({                   //label的父div默认蓝框白底右下角显示，样式className为：amap-marker-label
            offset:new AMap.Pixel(0,-15),   //修改父div相对于maker的位置
            content:"我是label标签"
        });
    }

    return {
        paintMap:paintMap,
        paintshopPoint:shopPoint,
        myPosition:myPosition,
    }
});


main.factory('mainPost',function($http){
    var url = 'http://192.168.1.39:8080';
    var postData = function(data,path){
        return $http({
            method:'POST',
            url: url + path,
            data: data,
            headers:{'Content-Type':'application/json'},
        });
    }
    return {
        postData: function(data,path){
            return postData(data,path,'postData');
        }
    }
});
main.factory('logMsg',function(){

    var signature = 'b9528d938a3d6ac64865aee2324d84da';
    var appKey = "e330ce4aa98546b3b99329d20e17450b";
    return {
        accessInfo:{
            app_key:appKey,
            signature:signature
        }
    }
});