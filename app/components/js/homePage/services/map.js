/**
 * Created by 殿麒 on 2015/11/25.
 */
(function(){
    angular
        .module('huipayMap',[])
        .service('MyMap',MyMap)
        .service('Regeocoder',Regeocoder);
    //  地图显示
    function MyMap(){
        //  代码来源：http://lbs.amap.com/api/javascript-api/example/a/0101-2/
        this.map = new AMap.Map('container', {
            resizeEnable: true
        }).plugin('AMap.Geolocation');
        this.geo = new AMap.Geolocation({
            enableHighAccuracy: true,                       //是否使用高精度定位，默认:true
            timeout: 10000,                                 //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),           //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,                           //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition:'LB'
        });
        this.addressInfo = '';
        //this.lnglat = [];
    };
    //  浏览器定位
    MyMap.prototype.getPosition = function(){
        //  代码来源：http://lbs.amap.com/api/javascript-api/example/g/0704-2/
        this.map.addControl(this.geo);
        this.geo.getCurrentPosition();
        //  监听事件代码：http://lbs.amap.com/api/javascript-api/example/i/0905-2/
        AMap.event.addListener(this.geo, 'complete', onComplete);    //返回定位信息
        function onComplete(data){
            var lnglat = [data.position.getLng(),data.position.getLat()];
            Regeocoder(lnglat);
        }
    }

    //  获取当前位置
    MyMap.prototype.getLnglat = function(){
        return [this.map.getCenter().lng,this.map.getCenter().lat];
    }

    //  逆地理编码
    function Regeocoder(lnglat){

        //  代码来源：http://lbs.amap.com/api/javascript-api/example/p/1602-2/
        var MGeocoder;
        //加载地理编码插件
        AMap.service(["AMap.Geocoder"], function() {
            MGeocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            });
            //逆地理编码
            MGeocoder.getAddress(lnglat, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    geocoder_CallBack(result);
                }
            });
        });
        function geocoder_CallBack(data) {
            var address = data.regeocode.formattedAddress; //返回地址描述
            console.log(address);
        }
    }
}());
