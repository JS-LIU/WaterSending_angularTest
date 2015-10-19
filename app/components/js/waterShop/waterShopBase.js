/**
 * Created by µî÷è on 2015/10/19.
 */
waterShop.factory('shopDetailsPost',function($http){
    var url = 'http://114.251.53.22/huipaywater/';
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
    var app_secret = hex_md5("165416");
    var appKey = "e330ce4aa98546b3b99329d20e17450b";
    this.accessInfo = {
        app_key:appKey,
        signature:app_secret
    }
});
//  ÅÐ¶ÏÊÇ·ñµÇÂ¼
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