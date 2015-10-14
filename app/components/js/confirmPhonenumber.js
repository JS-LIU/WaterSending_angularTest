/**
 * Created by 殿麒 on 2015/9/18.
 */

logIn.controller('inputPhonenum',['$rootScope', '$scope',function($rootScope,$scope){
    $scope.getNumber = function(){
        $rootScope.phoneNum = $scope.phoneNum;
        $rootScope.phoneLoc = $scope.phoneLoc;
        $rootScope.isshow = true;
    }
}]);

logIn.controller('confirmPhonenum',function($rootScope,$scope,logService){
    $scope.cancel = function(){
        $rootScope.isshow = false;
    }
    $scope.ok = function(){
        var path = '/checkCode/new';
        var app_secret = hex_md5("165416");
        var accessInfo = {
            app_key:"e330ce4aa98546b3b99329d20e17450b",
            signature:app_secret
        }
        var data = {
            accessInfo:accessInfo,
            phone_num:$rootScope.phoneNum,
            checkCodeType:1,
            sign:"meng wei"
        }
        logService.events(data,path).success(function(data) {
            console.log(data);
        });
        $rootScope.isshow = false;
    }
})