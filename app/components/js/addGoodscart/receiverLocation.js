/**
 * Created by 殿麒 on 2015/10/11.
 */
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
purchase.controller('receiverLocation',function($scope,$rootScope,$cookieStore,$swipe,getAccessInfo,purchasePost){
    var isFixed = GetQueryString("fixed");

    console.log(isFixed);
    var lnglatXY = $cookieStore.get('lnglatXY');
    if(lnglatXY){
        var position_x = lnglatXY.position_x;
        var position_y = lnglatXY.position_y;
        var addressInfo = lnglatXY.addressInfo;
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
            console.log(isFixed);
            if(isFixed){
                for(var i = 0;i<$scope.myAddress.length;i++){
                    $scope.myAddress[i].canDeliever = true;
                    console.log($scope.myAddress[i].canDeliever);
                }
            }else{
                if($rootScope.SELECTADDRESS == undefined){
                    $rootScope.SELECTADDRESS = $scope.myAddress[0];
                    var defaultAddress = $scope.myAddress[0];
                    myAddress(defaultAddress);
                }else{
                    myAddress($rootScope.SELECTADDRESS);
                }
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