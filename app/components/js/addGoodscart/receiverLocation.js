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
//
purchase.directive('liulist',function($swipe){
    var x,x1,x2,$_eleLeft;
    function link($scope,ele){
        $swipe.bind(ele, {
            'start': function() {
                x = 0;
                $(ele).css('left','0px');
                $_eleLeft = parseFloat(ele.css('left'));
            },
            'move': function(coords) {
                x2 = x1 || x;
                x1 = coords.x;
                var dif = x1 - x2;
                console.log()
                if($_eleLeft <= 0 && dif < 0){
                    $(ele).css({
                        left:'+=' + dif +'px'
                    });
                }
            },
            'end': function() {
                var $_eleLeft = parseFloat($(ele).css('left'));
                if($_eleLeft >　-35){
                    $(ele).css('left','-0px');
                }
                if($_eleLeft <　-55){
                    $(ele).css('left','-55px');
                }
            }
        });
    }
    return{
        restrict:'E',
        template:'<li class="pr" ><div ng-transclude></div></li>',
        transclude:true,
        replace:true,
        link:link
    }
});