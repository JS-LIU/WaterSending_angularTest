/**
 * Created by 殿麒 on 2015/9/19.
 */
logIn.controller('fillCheckcode',function($rootScope,$scope,logService){

    $scope.isresend = '秒后重发';
    $scope.t = function(){
        $scope.time = 60;
        var t = $scope.t;
        $scope.t = function(){
            return  false;
        }
        var setI = setInterval(function(){
            $scope.time--;
            if($scope.time == 1){
                $scope.time = '';
                $scope.isresend = '重新发送'
                clearInterval(setI);
                $scope.t = t;
            }
            $scope.$apply();
        },1000);
    }
    $scope.t();
    $scope.submit_registInfo = function(){
        var phone_num = $rootScope.phoneNum;
        var password = $scope.password;
        var md5_password = hex_md5(password);
        var app_secret = hex_md5("165416");
        var check_code = $scope.checkcode;
        var path = "account/new/regist";
        var accessInfo = {
            app_key:"e330ce4aa98546b3b99329d20e17450b",
            signature:app_secret
        }
        var data = {
            accessInfo:accessInfo,
            md5_key:'md5_keyStr',
            check_code:check_code,
            password:md5_password,
            phone_num:phone_num,
            sign:'meng wei'
        }

        logService.events(data,path).success(function(data) {
            console.log(data);
        });
    }
});