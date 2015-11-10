/**
 * Created by 殿麒 on 2015/10/28.
 */
var pay = angular.module('WXpay', ['ngRoute','ngCookies']);

pay.controller('orderModel',function($rootScope,$scope,$cookieStore,$location){
    var order = $cookieStore.get('orderId');
    $scope.orderId = order["orderId"];
    $scope.payMoney = order["final_fee"];

    if($location.url() == ''){
        window.location.href = "weixin://open.weixin.qq.com/conn" +
            "ect/oauth2/authorize?appid=wxdab7bbbbcba36617&redi" +
            "rect_uri=http:http://www.huipay.com/huipaywater/app" +
            "/09-payPage.html&response_type=code&scope=snsapi_b" +
            "ase&state=1#wechat_redirect";
    }else{
        $rootScope.CODE = $location.url();
    }

});
pay.controller('WXController',function($rootScope,$scope,$cookieStore,purchasePost,log,getAccessInfo){

    $scope.toPay = function(){
        var order = $cookieStore.get('orderId');
        var data = {
            accessInfo:getAccessInfo.loginAccessInfo(),
            channel:33,
            orderId:order["orderId"],
            resubmit:false,
            sign:'sign',
            code:$rootScope.CODE
        }
        var path = "pay/confirm";
        purchasePost.postData(data,path).success(function(data){
            var data = data;
            function onBridgeReady(){
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        "appId" : data.appId,                                 //公众号名称，由商户传入
                        "timeStamp":data.timeStamp,                           //时间戳，自1970年以来的秒数
                        "nonceStr" : data.nonceStr,                           //随机串
                        "package" : data.package,
                        "signType" : "MD5",                                   //微信签名方式：
                        "paySign" : data.paySign                              //微信签名
                    },
                    function(res){
                        if(res.err_msg == "get_brand_wcpay_request：ok" ) {}   // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                    }
                )
            }
            if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
            }else{
                onBridgeReady();
            }
        });
    }
});

pay.factory('purchasePost',function($http){
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
pay.factory('log',function($cookieStore){
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

pay.service('getAccessInfo',function(log,$cookieStore){
    var app_secret = hex_md5("5e5cd8e3ccca45c2a5a3b00a5a90cdd5");
    var appKey = "cf385992c3fc46cbaebae2c1dae08653";
    this.accessInfo = {
        app_key:appKey,
        signature:app_secret
    }
    this.loginAccessInfo = function(){
        var access_token = $cookieStore.get('access_token').access_token;
        var access_token_secret = $cookieStore.get('access_token').access_token_secret;
        var accessInfo = {
            app_key:appKey,
            signature:hex_md5("5e5cd8e3ccca45c2a5a3b00a5a90cdd5" + '&' + access_token_secret),
            access_token:access_token
        }
        return accessInfo;
    }
});