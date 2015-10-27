/**
 * Created by 殿麒 on 2015/10/11.
 */
purchase.controller('receiverLocation',function($scope,$rootScope,$cookieStore,$swipe,getAccessInfo,purchasePost){
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

    var path = "delieveryAddress/show"
    purchasePost.postData(data,path).success(function(data){
        if(data.length > 0){
            $scope.myAddress = data;
            if($rootScope.SELECTADDRESS == undefined){
                $rootScope.SELECTADDRESS = $scope.myAddress[0];
                var defaultAddress = $scope.myAddress[0];
                myAddress(defaultAddress);
            }else{
                myAddress($rootScope.SELECTADDRESS);
            }
        }
    });

    $scope.modiAddress = function(){
        console.log('0');
    }

    //  删除地址
    $scope.delAddress = function(item){
        var path = 'delieveryAddress/delete';
        var addressId = item.addressId;
        var data = {
            addressId:addressId,
            sign:'mengwei',
            accessInfo:getAccessInfo.loginAccessInfo()
        }
        purchasePost.postData(data,path).success(function(){

            $scope.myAddress.splice($.inArray(item,$scope.myAddress),1);

        });
    }
    //  选择地址
    $scope.selAddress = function(item){
        if(item["canDeliever"]){
            $rootScope.SELECTADDRESS = item;
            window.location.href = "#/confirmOrder";
        }
    }

    //  送货地址赋值
    function myAddress(item){
        $scope.default_receiverName = item["recieve_name"];
        $scope.default_receiverPhone = item["phone_num"];
        $scope.default_fullAddress = item["phone_num"];
        $scope.default_receiverAddress = item["fullAddress"];
    }

});