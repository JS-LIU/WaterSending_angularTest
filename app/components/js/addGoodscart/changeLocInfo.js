/**
 * Created by 殿麒 on 2015/10/12.
 */
purchase.factory("get_location",function($rootScope){
    /*
     *  代码来源：http://lbs.amap.com/api/javascript-api/example/p/1602-2/
     *  作用：得到当前位置
     */
    function paintMap(){
        $rootScope.map = new AMap.Map('mapContainer', {
            resizeEnable: true,
            zoom:13
        });
    }
    function geocoder(lnglatXY,$scope) {
        $rootScope.map.setCenter(lnglatXY);
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
        $rootScope.ADDRESS = data.regeocode.formattedAddress;
        autoSearch($rootScope.ADDRESS,$scope);
        $scope.lnglat = {
            position_x:lnglatXY[0],
            position_y:lnglatXY[1],
            addressInfo:$rootScope.ADDRESS,
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
        $rootScope.map.on('dragend',function(){
            var nowLocation = [$rootScope.map.getCenter().lng,$rootScope.map.getCenter().lat];
            console.log(nowLocation);
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

    //输入提示
    function autoSearch(keywords,$scope){
        var auto;
        //加载输入提示插件
        AMap.service(["AMap.Autocomplete"], function() {
            var autoOptions = {
                city: "" //城市，默认全国
            };
            auto = new AMap.Autocomplete(autoOptions);
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
                (function(obj){
                    $rootScope.map.getCity(function(data){
                        obj.cityId = data.citycode;
                    });
                })(obj);
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
        search:autoSearch,
        paintMap:paintMap
    }
});

purchase.controller('changeLocInfo',function($rootScope,$scope,get_location,$cookieStore){
    var lnglat = $cookieStore.get('lnglatXY');
    var d = [lnglat.position_x,lnglat.position_y];
    get_location.paintMap();
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
    $scope.setAddress = function(item){
        $rootScope.MYADDRESSINFO = item;
        window.location.href = "#/modiAddress";
    }
});

purchase.controller('new_receiveInfo',function($rootScope,$scope,getAccessInfo,purchasePost){
    //  地址信息
    var MYADDRESSINFO = $rootScope.MYADDRESSINFO;
    function setaddress(){
        if(MYADDRESSINFO!=undefined){
            return $rootScope.MYADDRESSINFO.loc;
        }else{
            return '选择位置';
        }
    }
    $scope.address = setaddress();

    //  保留填写【地址信息】【前】输入的内容 （姓名、电话、门牌号）
    $scope.getValue = function(e,str){
        var $_self = $(e.target);
        $rootScope[str] = $_self.val();
    }
    $scope.myName = $rootScope.NAME;
    $scope.phoneNum = $rootScope.PHONENUM;
    $scope.detailAddress = $rootScope.DETAILADDRESS;

    var myName,phone_num,detailsAddress;
    $scope.$watch('myName',function(){
        myName = $scope.myName;
    });
    $scope.$watch('phoneNum',function(){
        phone_num = $scope.phoneNum;
    });
    $scope.$watch('detailAddress',function(){
        detailsAddress = $scope.detailAddress;
    });

    //  【保存】按钮事件
    $scope.saveNewLoc = function(){

        var fullAddress = $scope.address + detailsAddress;
        var addressItem = {
            phone_num:phone_num,
            recieve_name:myName,
            position_x:MYADDRESSINFO.lnglat[0],
            position_y:MYADDRESSINFO.lnglat[1],
            provinceId:'0',
            cityId:MYADDRESSINFO.cityId,
            fullAddress:fullAddress,
            userId:0
        }
        var data = {
            addressItem:addressItem,
            accessInfo:getAccessInfo.loginAccessInfo(),
            sign:'sign'
        }
        var path = 'delieveryAddress/new';
        //  保存到后台
        purchasePost.postData(data,path).success(function(data){
            console.log(data);
            window.location.href = "#/receiverAddress";
        });
    }
});