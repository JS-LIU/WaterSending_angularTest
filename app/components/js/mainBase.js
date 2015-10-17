/**
 * Created by 殿麒 on 2015/9/29.
 */
main.factory("get_location",function($rootScope){
    var geolocation,lnglatXY;
    function paintMap(){
        /*
         *   代码来源：http://lbs.amap.com/api/javascript-api/example/g/0704-2/
         *   作用：获取【当前经纬度】
         */
        //加载地图，调用浏览器定位服务
        $rootScope.map = new AMap.Map('mapContainer', {
            resizeEnable: true
        });
        $rootScope.map.plugin('AMap.Geolocation', function() {
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
            $rootScope.map.addControl(geolocation);
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
                    geocoder_CallBack(result,lnglatXY);
                }
            });
        });
    }

    function geocoder_CallBack(data,lnglatXY) {
        //返回地址描述
        $rootScope.ADDRESS = data.regeocode.formattedAddress;
        $rootScope.LNGLAT = {
            position_x:lnglatXY[0] + '',
            position_y:lnglatXY[1] + '',
            addressInfo:$rootScope.ADDRESS,
            districtId:data.regeocode.addressComponent.citycode
        };
        $rootScope.$apply();
    }
    /*
     *  代码来源：http://lbs.amap.com/api/javascript-api/example/e/0506-2/
     *  作用：添加商店标记
     */
    function shopPoint(i,d,curd){
        var markerOption = {
            map: $rootScope.map,
            icon:"http://webapi.amap.com/theme/v1.3/markers/n/mark_b"+(i+1)+".png",
            position: d
        };
        var mar = new AMap.Marker(markerOption);
        $rootScope.map.setFitView();
        $rootScope.map.setCenter(curd);
    }
    //  清楚标记
    function clearMaker(){
        $rootScope.map.clearMap();
    }
    /*
     *   代码来源：http://lbs.amap.com/api/javascript-api/example/i/0902-2/
     *   作用：监听地图【拖拽】事件
     *   代码来源：http://localhost:63342/WaterSending_angularTest/app/06-main.html#/
     *   作用：获取【当前地图中心经纬度】
     */
    function changeMyPosition(func){
        $rootScope.map.on('dragend',function(){
            var nowLocation = [$rootScope.map.getCenter().lng,$rootScope.map.getCenter().lat];
            func(nowLocation);

            setTimeout(function(){
                var correct = [$rootScope.map.getCenter().lng,$rootScope.map.getCenter().lat];
                if(correct[0] != nowLocation[0] || correct[1] != nowLocation[1]){
                    func(correct);
                    console.log('矫正惯性误差成功...');
                }
            },2000);
        })
    }
    return {
        paintMap:paintMap,
        paintshopPoint:shopPoint,
        resetMyPosition:changeMyPosition,
        getCurAddress:geocoder,
        clearMaker:clearMaker
    }
});


main.factory('mainPost',function($http){
    var url = 'http://114.251.53.22/huipaywater/';
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


main.service('getAccessInfo',function(){
    var app_secret = hex_md5("165416");
    var appKey = "e330ce4aa98546b3b99329d20e17450b";
    this.accessInfo = {
        app_key:appKey,
        signature:app_secret
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