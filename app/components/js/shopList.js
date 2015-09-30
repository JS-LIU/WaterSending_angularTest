/**
 * Created by 殿麒 on 2015/9/28.
 */
main.controller('showListModel',function($scope,$rootScope,mainPost,logMsg){
    var accessInfo = logMsg.accessInfo;
    $rootScope.NAVBOT = true;
});

main.factory('mainPost',function($http){
    var url = 'http://192.168.1.39:8080';
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
