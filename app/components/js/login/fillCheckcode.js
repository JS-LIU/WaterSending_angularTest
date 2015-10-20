/**
 * Created by 殿麒 on 2015/9/19.
 */
logIn.controller('fillCheckcode',function($rootScope,$scope,getCheckcode,regesteData,getAccessInfo,logService){

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

    getCheckcode.getCheckcode({
        phone_num:$rootScope.PHONENUM,
        checkCodeType:1
    }).success(function(data){
        console.log(data);
        $scope.submit_registInfo = function(){
            console.log($scope.password);
            console.log(regesteData.md5_key);
            console.log($rootScope.PHONENUM);
            var passWord = hex_md5($scope.password+$rootScope.PHONENUM+regesteData.md5_key);
            var registerData = {
                sign:'mengwei',
                md5_key:regesteData.md5_key,
                accessInfo:getAccessInfo.accessInfo,
                phone_num:$rootScope.PHONENUM,
                check_code:data.checkCode,
                password:passWord
            }
            console.log(registerData);
            var path = 'account/new/regist';
            logService.postData(registerData,path).success(function(data){
                console.log(data);
            });
        }

    })
});