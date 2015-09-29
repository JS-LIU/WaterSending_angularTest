/**
 * Created by ���� on 2015/9/29.
 */
main.factory("get_location",function($cookieStore){

    var map, geolocation,lnglatXY,address;
    /*
     *   ������Դ��http://lbs.amap.com/api/javascript-api/example/g/0704-2/
     *   ���ã���ȡ����ǰ��γ�ȡ�
     */
    //���ص�ͼ�������������λ����
    map = new AMap.Map('mapContainer', {
        resizeEnable: true
    });
    map.plugin('AMap.Geolocation', function() {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//�Ƿ�ʹ�ø߾��ȶ�λ��Ĭ��:true
            timeout: 10000,          //����10���ֹͣ��λ��Ĭ�ϣ������
            maximumAge: 100000,      //��λ�������0���룬Ĭ�ϣ�0
            convert: true,           //�Զ�ƫ�����꣬ƫ�ƺ������Ϊ�ߵ����꣬Ĭ�ϣ�true
            showMarker: true,        //��λ�ɹ����ڶ�λ����λ����ʾ���ǣ�Ĭ�ϣ�true
            showCircle: true,        //��λ�ɹ�����ԲȦ��ʾ��λ���ȷ�Χ��Ĭ�ϣ�true
            panToLocation: true,     //��λ�ɹ��󽫶�λ����λ����Ϊ��ͼ���ĵ㣬Ĭ�ϣ�true
            zoomToAccuracy: true     //��λ�ɹ��������ͼ��Ұ��Χʹ��λλ�ü����ȷ�Χ��Ұ�ڿɼ���Ĭ�ϣ�false
        });
        map.addControl(geolocation);
        AMap.event.addListener(geolocation, 'complete', onComplete);//���ض�λ��Ϣ
    });
    function onComplete(data) {
        lnglatXY = [data.position.getLng(),data.position.getLat()];
        geocoder(lnglatXY);
    }

    //  ��ȡ��ǰλ����Ϣ
    function getCurrentPosition () {
        geolocation.getCurrentPosition();
    };
    /*
     *  ������Դ��http://lbs.amap.com/api/javascript-api/example/p/1602-2/
     *  ���ã��õ���ǰλ��
     */

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

    function geocoder_CallBack(data) {
        //���ص�ַ����
        address = data.regeocode.formattedAddress;
        $cookieStore.put('lnglatXY',{
            positionX:lnglatXY[0],
            positionY:lnglatXY[1],
            addressInfo:address,
            districtId:'this is a no use parameter'
        });
    }

    return {
        paintMap:getCurrentPosition
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