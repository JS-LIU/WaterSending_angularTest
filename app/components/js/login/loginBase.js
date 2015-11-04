/**
 * Created by 殿麒 on 2015/10/19.
 */
logIn.service('getAccessInfo',function(){
    var app_secret = hex_md5("8262af21b2b6457d9c2cec10e08d01b9");
    var appKey = "9631075388a641ee9197f0496685f320";
    this.accessInfo = {
        app_key:appKey,
        signature:app_secret
    }
});
//  生成md5key
logIn.service('regesteData',function(){
    this.md5_key = Math.uuid();
});
//  获取checkcode
logIn.service('getCheckcode',function(getAccessInfo,logService){
    this.getCheckcode = function(obj){
        var accessInfo = getAccessInfo.accessInfo;
        var data = {
            accessInfo:accessInfo,
            sign:'mengwei'
        }
        var path = "checkCode/new";
        for(var prop in obj){
            data[prop] = obj[prop];
        }
        console.log(data);
        return logService.postData(data,path);
    }
});

//  密码
logIn.service('getPassword',function(){
    this.passWord = function(userName,pwd,md5_key){
        var pwd = userName + pwd + md5_key;
        var md5_pwd = hex_md5(pwd);
        return md5_pwd;
    }
});

logIn.factory('logService',function($http){
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