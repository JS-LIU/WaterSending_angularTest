/**
 * Created by 殿麒 on 2015/9/21.
 */

purchase.controller('payGoodsModel',function($scope,$cookieStore){

    var shopInfo = $cookieStore.get('shopInfo');
    var order_goodslist = $cookieStore.get('order_goodslist');
    var totleNum = 0;
    var totleMoney = 0;
    $scope.shopName = shopInfo.shopName;

    $scope.order_goodslist = order_goodslist;
    for(var i = 0,len = order_goodslist.length;i < len; i++){
        totleNum += parseInt(order_goodslist[i].num);
        totleMoney += parseInt(order_goodslist[i].num * order_goodslist[i].price);
    }
    $scope.totleNum = totleNum;
    $scope.totleMoney = totleMoney;
});


//  对话框
purchase.directive('dialog',function(){
    function link($scope,ele){
        var window_width = window.screen.availWidth,
            dialog_left = (window_width - 235) / 2,
            window_height = window.screen.availHeight,
            dialog_header = parseFloat($('.dialog-header').css('height'))||0,
            dialog_center =  parseFloat($('.dialog-center').css('height')) || 0,
            dialog_bottom =  parseFloat($('.dialog-bottom').css('height')) || 0,
            dialog_height = dialog_header + dialog_center + dialog_bottom,
            dialog_top = (window_height - dialog_height) / 2;

        ele.css({'left':dialog_left + 'px','top':dialog_top + 'px'});
    }

    return {
        restrict:'E',
        template:'<div class="dialog-main" ng-transclude></div>',
        transclude:true,
        link:link
    }
});
purchase.factory('goodsCartcookie',function($cookieStore){
    function addCookie(cookieList,addProduct){
        //  添加cookie
        if(cookieList == undefined || cookieList.length == 0){
            addProduct.num = 1;
            addProduct.isChecked = true;
            $cookieStore.put('goodscart_list',[addProduct]);
        }else{
            //  cookie对象中的值不知道怎么改 百度说重写就修改了
            var new_goodscart_list = cookieList;
            //  查重
            for(var i = 0, len = new_goodscart_list.length;i < len;i++){
                if(new_goodscart_list[i].productId == addProduct.productId){
                    new_goodscart_list[i].num += 1;
                    $cookieStore.put('goodscart_list',new_goodscart_list);
                    console.log($cookieStore.get('goodscart_list'));
                    break;
                }else if(new_goodscart_list[i].productId != addProduct.productId && i == (len - 1)){
                    addProduct.num = 1;
                    addProduct.isChecked = true;
                    console.log(new_goodscart_list);
                    new_goodscart_list.push(addProduct);
                    $cookieStore.put('goodscart_list',new_goodscart_list);
                }
            }
        }
    }

    function changeCookie(){
    }

    return {
        add_goodsCart_cookie:addCookie,
        change_goodsCart_cookie:changeCookie
    }
})

purchase.factory('purchasePost',function($http){
    var url = 'http://www.huipay.com/huipaywater/';
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

//  判断是否登录
purchase.factory('log',function($cookieStore){
    var isLogin = function(){
        if($cookieStore.get('access_token') != undefined){
            return true;
        }else{
            return false;
        }
    }
    return {
        login:isLogin
    };
});

purchase.service('getAccessInfo',function(log,$cookieStore){
    var app_secret = hex_md5("8262af21b2b6457d9c2cec10e08d01b9");
    var appKey = "9631075388a641ee9197f0496685f320";
    this.accessInfo = {
        app_key:appKey,
        signature:app_secret
    }
    this.loginAccessInfo = function(){
        var access_token = $cookieStore.get('access_token').access_token;
        var access_token_secret = $cookieStore.get('access_token').access_token_secret;
        var accessInfo = {
            app_key:appKey,
            signature:hex_md5('8262af21b2b6457d9c2cec10e08d01b9' + '&' + access_token_secret),
            access_token:access_token
        }
        return accessInfo;
    }
});