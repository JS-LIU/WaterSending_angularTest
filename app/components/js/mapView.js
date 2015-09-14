/**
 * Created by ���� on 2015/8/31.
 */

main.controller("cutView", ['$scope', '$rootScope',function($scope,$rootScope){
    $scope.toggleView = function(){
        $rootScope.isshow = !$rootScope.isshow;
    }
}]);

main.controller("mapView",['$rootScope',function($rootScope){
    $rootScope.isshow = true;
}]);

main.controller("mapAPI",['$scope','myLocation',function($scope,myLocation){
    $scope.map = myLocation();
}]);
main.factory("myLocation",function(){
    //  ������Դ��http://lbs.amap.com/api/javascript-api/example/g/0704-2/
    return function myLocation(){
        var map, geolocation,latX,latY,lnglatXY,address;
        //  ���ص�ͼ�������������λ����
        map = new AMap.Map('mapContainer', {
            resizeEnable: true
        });
        map.plugin('AMap.Geolocation', function() {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,// �Ƿ�ʹ�ø߾��ȶ�λ��Ĭ��:true
                timeout: 10000,          // ����10���ֹͣ��λ��Ĭ�ϣ������
                maximumAge: 100000,      // ��λ�������0���룬Ĭ�ϣ�0
                convert: true,           // �Զ�ƫ�����꣬ƫ�ƺ������Ϊ�ߵ����꣬Ĭ�ϣ�true
                showButton: true,        // ��ʾ��λ��ť��Ĭ�ϣ�true
                showMarker: true,        // ��λ�ɹ����ڶ�λ����λ����ʾ���ǣ�Ĭ�ϣ�true
                showCircle: true,        // ��λ�ɹ�����ԲȦ��ʾ��λ���ȷ�Χ��Ĭ�ϣ�true
                panToLocation: true,     // ��λ�ɹ��󽫶�λ����λ����Ϊ��ͼ���ĵ㣬Ĭ�ϣ�true
                zoomToAccuracy: true     // ��λ�ɹ��������ͼ��Ұ��Χʹ��λλ�ü����ȷ�Χ��Ұ�ڿɼ���Ĭ�ϣ�false
            });
            map.addControl(geolocation);
            AMap.event.addListener(geolocation, 'complete', onComplete);//  ���ض�λ��Ϣ
            AMap.event.addListener(geolocation, 'error', onError);      //  ���ض�λ������Ϣ
        });

        //  ��ȡ��ǰλ����Ϣ
        (function getCurrentPosition() {
            geolocation.getCurrentPosition();
        })();
        //  ��ص�ǰλ�ò���ȡ��ǰλ����Ϣ
        function watchPosition() {
            geolocation.watchPosition();
        };
        //  ������λ���
        function onComplete(data) {
            //  ����
            latX = data.position.getLng();
            //  γ��
            latY = data.position.getLat();
            lnglatXY = [latX,latY];
            geocoder(lnglatXY);
        }

        //  ������λ������Ϣ
        function onError(data) {
        }

        //  ������Դ��http://lbs.amap.com/api/javascript-api/example/p/1602-2/
        function geocoder(lnglatXY) {
            var MGeocoder;
            //���ص��������
            AMap.service(["AMap.Geocoder"], function() {
                MGeocoder = new AMap.Geocoder({
                    radius: 1000,
                    extensions: "all"
                });
                //��������
                MGeocoder.getAddress(lnglatXY, function(status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        geocoder_CallBack(result);
                    }
                });
            });
        }
        //�ص�����
        function geocoder_CallBack(data) {
            //���ص�ַ����
            address = data.regeocode.formattedAddress;
            $('#a').html(address);
        }
        return address;
    }
});



