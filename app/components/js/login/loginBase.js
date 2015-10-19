/**
 * Created by ���� on 2015/10/19.
 */
logIn.service('getAccessInfo',function(){
    var app_secret = hex_md5("165416");
    var appKey = "e330ce4aa98546b3b99329d20e17450b";
    this.accessInfo = {
        app_key:appKey,
        signature:app_secret
    }
});
//  ����md5key
logIn.service('regesteData',function(){
    this.md5_key = Math.uuid();
});
//  ��ȡcheckcode
logIn.service('getCheckcode',function(getAccessInfo,logService){
    this.getCheckcode = function(obj){
        var accessInfo = getAccessInfo.accessInfo;
        var data = {
            accessInfo:accessInfo,
            sign:'mengwei'
        }
        var path = "/checkCode/new";
        for(var prop in obj){
            data['prop'] = obj.prop;
        }
        return logService.postData(data,path);
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