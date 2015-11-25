/**
 * Created by 殿麒 on 2015/11/25.
 */
(function(){
    angular
        .module('myApp')
        .service('MyMap',MyMap);

    //  地图显示
    function MyMap(){
        //  代码来源：http://lbs.amap.com/api/javascript-api/example/a/0101-2/
        this.map = new AMap.Map('container', {
            resizeEnable: true
        });
        this.addressInfo = '';
        this.lnglat = [];
    };

    //  浏览器定位
    MyMap.prototype.getNowLnglat = function(){
        //  代码来源：http://lbs.amap.com/api/javascript-api/example/g/0704-2/
        var geolocation,
            map = this.map;
        map.plugin('AMap.Geolocation', function() {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,                       //是否使用高精度定位，默认:true
                timeout: 10000,                                 //超过10秒后停止定位，默认：无穷大
                buttonOffset: new AMap.Pixel(10, 20),           //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,                           //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition:'LB'
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
        });
        AMap.event.addListener(geolocation, 'complete', onComplete);     //返回定位信息
        function onComplete(data) {
            this.lnglat = [data.position.getLng(),data.position.getLat()];
        }
    }
    //  逆地理编码
    //MyMap.prototype.regeocoder = function(lnglat){
    //    //  代码来源：http://lbs.amap.com/api/javascript-api/example/p/1602-2/
    //    var geocoder = new AMap.Geocoder({
    //        radius: 1000,
    //        extensions: "all"
    //    });
    //    geocoder.getAddress(lnglat, function(status, result) {
    //        if (status === 'complete' && result.info === 'OK') {
    //            geocoder_CallBack(result);
    //        }
    //    });
    //    function geocoder_CallBack(data) {
    //        this.addressInfo = data.regeocode.formattedAddress;              //返回地址描述
    //    }
    //}

}());