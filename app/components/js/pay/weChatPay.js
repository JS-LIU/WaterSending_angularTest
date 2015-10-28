/**
 * Created by 殿麒 on 2015/10/28.
 */
var pay = angular.module('WXpay', ['ngRoute','ngCookies']);

pay.controller('orderModel',function($rootScope,$scope,$cookieStore,$location){
    var order = $cookieStore.get('orderId');
    console.log(order);
    $scope.orderId = order["orderId"];
    $scope.payMoney = order["final_fee"];

    if($location.url() == ''){
        window.location.href = "https://open.weixin.qq.com/conn" +
            "ect/oauth2/authorize?appid=wxdab7bbbbcba36617&redi" +
            "rect_uri=http://114.251.53.22/huipaywater/pages/water/app/09-payPage.html&respon" +
            "se_type=code&scope=snsapi_base&state=1#wechat_redi" +
            "rect";
    }else{
        console.log($location.url());
    }

})