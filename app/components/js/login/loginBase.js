/**
 * Created by 殿麒 on 2015/10/19.
 */
logIn.service('getAccessInfo',function(){
    var app_secret = hex_md5("5e5cd8e3ccca45c2a5a3b00a5a90cdd5");
    var appKey = "cf385992c3fc46cbaebae2c1dae08653";
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

logIn.service('getSign',function(){
    this.mySign = function(obj){
        var initialArr = [];
        for(var prop in obj){
            initialArr.push(prop);
        }
        initialArr.sort();
        var sign = '';
        for(var i = 0;i < initialArr.length;i++){
            if(typeof obj[initialArr[i]] == 'object'){
                var string_obj = JSON.stringify(obj[initialArr[i]]);
            }else{
                var string_obj = obj[initialArr[i]];
            }
            sign += (initialArr[i] + '=' +string_obj + '&');
        }

        var signLen = sign.length;
        sign = sign.slice(0,signLen-1);
        console.log(sign);
        var appSecret = "5e5cd8e3ccca45c2a5a3b00a5a90cdd5";
        var md5_sign = hex_md5(sign+appSecret);
        return md5_sign;
    }
});