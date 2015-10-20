/**
 * Created by 殿麒 on 2015/10/19.
 */
logIn.service('getAccessInfo',function(){
    var app_secret = hex_md5("165416");
    var appKey = "e330ce4aa98546b3b99329d20e17450b";
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