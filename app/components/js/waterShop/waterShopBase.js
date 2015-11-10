/**
 * Created by ���� on 2015/10/19.
 */
waterShop.factory('shopDetailsPost',function($http){
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
waterShop.service('getAccessInfo',function(){
    var app_secret = hex_md5("5e5cd8e3ccca45c2a5a3b00a5a90cdd5");
    var appKey = "cf385992c3fc46cbaebae2c1dae08653";
    this.accessInfo = {
        app_key:appKey,
        signature:app_secret
    }
});
//  �ж��Ƿ��¼
waterShop.factory('log',function($cookieStore){
    var isLogin = function(){
        if($cookieStore.get('logMsg') != undefined){
            return true;
        }else{
            return false;
        }
    }
    return {
        login:isLogin
    };
})