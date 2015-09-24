/**
 * Created by 殿麒 on 2015/9/23.
 */
logIn.controller('logInRequest',function($scope,logService,$http,$cookieStore){

    $scope.logInbtn = function(){
        var phoneNum = $scope.phoneNum;
        var signature = $scope.password + '&' + '165416';
        var appKey = "e330ce4aa98546b3b99329d20e17450b";
        var sign = 'BDA2A96987403A81E3935D0265086018';
        var md5_signature = hex_md5(signature);
        var path = '/account/login';
        var data = {
            sign : sign,
            accessInfo : {
                app_key : appKey,
                phone_num : phoneNum,
                signature : md5_signature
            }
        }
        //  本地环境中可能因为跨域无法取得值 先注释掉
        //$scope.events = logService.events(data,path).success(function(data){
        //    console.log(data);
        //});
        // 模拟获取值
        $http.get('components/data/login.json',{cache: true}).success(function(data){
            $cookieStore.put('logMsg',data);
        });
    }
})

logIn.factory('logService',function($http){
    var url = 'http://192.168.1.39:8080';
    var userLogin = function(data,path){
        return $http({
            method:'POST',
            url : url + path,
            data:data,
            headers:{'Content-Type':'application/json'},
            cache:true
        });
    }
    return {
        events:function(data,path){
            return userLogin(data,path,'events');
        }
    }
});


