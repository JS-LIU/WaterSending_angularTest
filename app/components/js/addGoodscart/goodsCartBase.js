/**
 * Created by 殿麒 on 2015/9/21.
 */
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
//  商品加入cookie
purchase.factory('goodsCartcookie',function($cookieStore){
    function addCookie(cookieList,addProduct){
        //  添加cookie
        if(cookieList == undefined || cookieList.length == 0){
            addProduct.num = 1;
            addProduct.isChecked = true;
            $cookieStore.put('goodscart_list',[addProduct]);
        }else{
            var new_goodscart_list = cookieList;
            //  查重
            for(var i = 0, len = new_goodscart_list.length;i < len;i++){
                if(new_goodscart_list[i].productId == addProduct.productId){
                    new_goodscart_list[i].num += 1;
                    $cookieStore.put('goodscart_list',new_goodscart_list);
                    break;
                }else if(new_goodscart_list[i].productId != addProduct.productId && i == (len - 1)){
                    addProduct.num = 1;
                    addProduct.isChecked = true;
                    new_goodscart_list.push(addProduct);
                    $cookieStore.put('goodscart_list',new_goodscart_list);
                }
            }
        }
    }

    return {
        add_goodsCart_cookie:addCookie
    }
})

purchase.factory('purchasePost',function($http){
    var url = 'http://www.huipay.com/huipaywater/';
    var postData = function(data,path){
        console.log(data);
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


purchase.service('toPay',function($cookieStore,log){
    var path = "#/confirmOrder";
    var url = "07-log.html";
    //  去付款
    this.pay = function(goodscartList){
        if(log.login()){
            //  保存cookie 这里必须保存 付款后从这里可以正确读数据
            cookieCheckedgoods(goodscartList);
            window.location.href = path;
        }else{
            //  保存cookie 这里必须保存 付款后从这里可以正确读数据
            cookieCheckedgoods(goodscartList);
            //  登录界面
            window.location.href = url;
        }
    }
    function cookieCheckedgoods(goodscartlist){
        var new_goodscart_list = [];
        var checked_goodscart_list = [];
        for(var i = 0,len = goodscartlist.length;i < len;i++){

            if(goodscartlist[i].isChecked == false){
                new_goodscart_list.push(goodscartlist[i]);
            }else{
                checked_goodscart_list.push(goodscartlist[i]);
            }
        }
        $cookieStore.put('goodscart_list',new_goodscart_list);
        $cookieStore.put('order_goodslist',checked_goodscart_list);
    }
});

purchase.service('refreshData',function(purchasePost){
    var wH = document.documentElement.clientHeight;
    this.getMoreData = function(data,path,func){
        $(window).scroll(function(){
            var dH = document.body.scrollHeight;
            var overH = document.body.scrollTop;
            if(wH + overH == dH){
                purchasePost.postData(data,path).success(function(getData){
                    func(getData,data);
                    dH = document.body.scrollHeight;
                });
            }
        })
    }
});

purchase.service('getSelfUrl',function($location){
    this.myUrl = $location.absUrl();
});