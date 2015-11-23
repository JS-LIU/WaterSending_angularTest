/**
 * Created by 殿麒 on 2015/10/11.
 */
purchase.controller('receiverLocation',function($scope,$rootScope,$location,$cookieStore,$swipe,getAccessInfo,purchasePost){
    var myUrl = $location.absUrl();
    var isFixed = false;    //  默认是【新增地址】
    //  临时代码 判断是否需要修改地址
    for(var i = 0 ;i<myUrl.length;i++){
        if(myUrl[i] == "?"){
            isFixed = true; //  【修改地址】
            break;
        }
    }
    $scope.lastPage = "06-main.html#/my";
    $scope.addAddress = true;
    var lnglatXY = $cookieStore.get('lnglatXY');
    if(!isFixed){   //  【新增地址】
        var position_x = lnglatXY.position_x;
        var position_y = lnglatXY.position_y;
        var addressInfo = lnglatXY.addressInfo;
        $scope.lastPage = "#/confirmOrder";
        $scope.addAddress = false;
    }

    //  获取常用地址
    var positionInfo = {
        districtId:'0',
        addressInfo:addressInfo||'',
        position_x:position_x||'0',
        position_y:position_y||'0'
    }
    var data = {
        accessInfo:getAccessInfo.loginAccessInfo(),
        positionInfo:positionInfo,
        sign:'sign'
    }

    var path = "delieveryAddress/show"
    purchasePost.postData(data,path).success(function(data){
        if(data.length > 0){
            $scope.myAddress = data;
            if(isFixed){    //  【修改地址】
                for(var i = 0;i<$scope.myAddress.length;i++){
                    $scope.myAddress[i].canDeliever = true;
                }
            }else{          //  【新增地址】
                var defaultAddress = $scope.myAddress[0];
                myAddress(defaultAddress);
            }
        }
    });

    $scope.modiAddress = function(){
        console.log('0');
    }

    //  删除地址
    $scope.delAddress = function(item,e){
        var path = 'delieveryAddress/delete';
        var addressId = item.addressId;
        var data = {
            addressId:addressId,
            sign:'mengwei',
            accessInfo:getAccessInfo.loginAccessInfo()
        }
        e = e || window.event;
        e.preventDefault();
        purchasePost.postData(data,path).success(function(){
            $scope.myAddress.splice($.inArray(item,$scope.myAddress),1);
        });
    }
    //  选择地址
    $scope.selAddress = function(item){
        $rootScope.SELECTADDRESS = item;
        if(isFixed){
            window.location.href="#/modiAddress";
        }else{
            if(item["canDeliever"]){
                window.location.href = "#/confirmOrder";
            }
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