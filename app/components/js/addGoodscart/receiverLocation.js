/**
 * Created by 殿麒 on 2015/10/11.
 */
purchase.controller('receiverLocation',function($scope,$rootScope,$cookieStore,getAccessInfo,purchasePost){
    var position_x = $cookieStore.get('lnglatXY').position_x;
    var position_y = $cookieStore.get('lnglatXY').position_y;
    var addressInfo = $cookieStore.get('lnglatXY').addressInfo;
    //  获取常用地址
    var positionInfo = {
        districtId:'0',
        addressInfo:addressInfo,
        position_x:position_x,
        position_y:position_y
    }
    var data = {
        accessInfo:getAccessInfo.loginAccessInfo(),
        positionInfo:positionInfo,
        sign:'mengwei'
    }
    console.log(data);
    var path = "delieveryAddress/show"
    purchasePost.postData(data,path).success(function(data){
        console.log(data);
        if(data.length > 0){
            $scope.myAddress = data;
            var defaultAddress = $scope.myAddress[0];
            $scope.default_receiverName = defaultAddress["recieve_name"];
            $scope.default_receiverPhone = defaultAddress["phone_num"];
            $scope.default_fullAddress = defaultAddress["phone_num"];
            $scope.default_receiverAddress = defaultAddress["fullAddress"];
        }
    });

    $scope.modiAddress = function(){
        console.log('0');
    }
})