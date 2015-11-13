/**
 * Created by 殿麒 on 2015/10/28.
 */
var pay = angular.module('WXpay', ['ngRoute','ngCookies']);
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
pay.controller('orderModel',function($rootScope,$scope,$cookieStore,$location,payPost,log,getAccessInfo,queryOrderData){
    var order = $cookieStore.get('orderId');
    $scope.orderId = order["orderId"];
    $scope.payMoney = order["final_fee"];
    var host = window.location.host;
    var contextPath = document.location.pathname;
    var index = contextPath.substr(1).indexOf("/");
    contextPath = contextPath.substr(0, index + 1);

    var url = "http://" + host + contextPath;
    var code = GetQueryString('code');
    if(!code){
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdab7bbbbcba36617&redirect_uri="+url+"/app/09-payPage.html&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
    }else{
        $scope.code = GetQueryString('code');
        $scope.toPay = function(){
            var path = "pay/confirm";
            payPost.postData(queryOrderData.getData({resubmit:false,code:$scope.code}),path).success(function(data){
                var data = data;
                function onBridgeReady(){
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                            "appId" : data.wexinSpec.appid,                                 //  公众号名称，由商户传入
                            "timeStamp":data.wexinSpec.timestamp,                           //  时间戳，自1970年以来的秒数
                            "nonceStr" : data.wexinSpec.noncestr,                           //  随机串
                            "package" : data.wexinSpec.packageValue,
                            "signType" : "MD5",                                             //  微信签名方式：
                            "paySign" : data.wexinSpec.sign                                 //  微信签名
                        },
                        function(res){
                            if(res.err_msg == "get_brand_wcpay_request:ok" ) {              //  使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                                var path = "pay/query";

                                payPost.postData(queryOrderData.getData(),path).success(function(data){
                                    var data = JSON.stringify(data);
                                    window.location.href= url + "/app/06-main.html#/order";
                                }).error(function(errData){
                                    var errData = JSON.stringify(errData);
                                });

                            }
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
            }).error(function(errdata){
            });
        }
    }

});

pay.factory('payPost',function($http){
    var host = window.location.host;
    var contextPath = document.location.pathname;
    var index = contextPath.substr(1).indexOf("/");
    contextPath = contextPath.substr(0, index + 1);

    var url = "http://" + host + contextPath + "/";
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

pay.service('queryOrderData',function($cookieStore,getAccessInfo){
    var order = $cookieStore.get('orderId');
    var orderId = order['orderId'];
    this.getData = function(obj){
        var data = {
            channel:33,
            orderId:orderId,
            accessInfo:getAccessInfo.loginAccessInfo(),
            sign:'sign'
        }

        for(var prop in obj){
            data[prop] = obj[prop];
        }
        return data;
    }
})