/**
 * Created by 殿麒 on 2015/11/25.
 */
(function(){
    angular
        .module('huipayMap',[])
        .service('MyMap',MyMap)
    //  地图显示
    function MyMap(){
        var self = this;

        //  配置文件
        //  代码来源：http://lbs.amap.com/api/javascript-api/example/a/0101-2/
        self.map = new AMap.Map('container', {
            resizeEnable: true
        }).plugin('AMap.Geolocation', function() {
            self.geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,               //  是否使用高精度定位，默认:true
                timeout: 10000,                         //  超过10秒后停止定位，默认：无穷大
                buttonOffset: new AMap.Pixel(10, 20),   //  定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,                   //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition:'LB'
            });
        });
        self.geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
        });
    };


    //  浏览器定位
    MyMap.prototype.paintCurrentPo = function(){
        var self = this;
        //  代码来源：http://lbs.amap.com/api/javascript-api/example/g/0704-2/
        self.map.addControl(self.geolocation);
        self.geolocation.getCurrentPosition();
    }

    //  得到定位信息
    MyMap.prototype.getPoInfo = function(func){
        var self = this;
        //  监听事件代码：http://lbs.amap.com/api/javascript-api/example/i/0905-2/
        AMap.event.addListener(self.geolocation, 'complete', onComplete);
        //  返回定位信息
        function onComplete(data){
            var lnglat = [data.position.getLng(),data.position.getLat()];
            //  var reg = new Regeocoder(lnglat);
            //  逆地理编码
            self.geocoder.getAddress(lnglat, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    /*
                     *  返回城市code
                     *  result.regeocode.addressComponent.citycode;
                     *  返回地址描述
                     *  result.regeocode.formattedAddress;
                     *
                     */
                    func(result.regeocode);
                }
            });
        }
    }

    //  获取当前位置
    MyMap.prototype.getLnglat = function(){
        return [this.map.getCenter().lng,this.map.getCenter().lat];
    }
}());
