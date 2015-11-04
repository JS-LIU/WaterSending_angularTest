/**
 * Created by µî÷è on 2015/10/19.
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
    var app_secret = hex_md5("8262af21b2b6457d9c2cec10e08d01b9");
    var appKey = "9631075388a641ee9197f0496685f320";
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