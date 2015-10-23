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
});
//
purchase.directive('liulist',function($swipe){
    var x,x1;
    function link($scope,ele){
        $swipe.bind(ele, {
            'start': function(coords) {
                x = coords.x;
                //  停止轮播
            },
            'move': function(coords) {
                cosnole.log(coords.x);
                //  等待优化
            },
            'end': function(coords) {
                x1 = coords.x;
                var dif = x - x1;
                //  swipe-left
                if(dif > 10){
                }else if(dif < -9){
                    //  开始轮播
                }
            }
        });
    }



    return{
        restrict:'E',
        template:'<li class="pr" ><div ng-transclude></div></li>',
        transclude:true,
        link:link
    }
});