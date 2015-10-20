/**
 * Created by 殿麒 on 2015/9/19.
 */
logIn.controller('fillCheckcode',function($rootScope,$scope,$location,getCheckcode,regesteData,getAccessInfo,logService){

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

    var self_url = $location.url();
    if(self_url == '/resetPassword'){
        var i = 4;
        var url = 'account/new/reset';
    }else if(self_url == '/fillCheckcode'){
        var i = 1;
        var url = 'account/new/regist';
    }

    getCheckcode.getCheckcode({
        phone_num:$rootScope.PHONENUM,
        checkCodeType:i
    }).success(function(data){
        console.log(data);
        $scope.submit_registInfo = function(){
            var passWord = hex_md5($rootScope.PHONENUM+$scope.password+regesteData.md5_key);
            var registerData = {
                sign:'mengwei',
                md5_key:regesteData.md5_key,
                accessInfo:getAccessInfo.accessInfo,
                phone_num:$rootScope.PHONENUM,
                check_code:data.checkCode,
                password:passWord
            }
            console.log(registerData);
            var path = url;
            logService.postData(registerData,path).success(function(data){
                console.log(data);
            });
        }
    })
});