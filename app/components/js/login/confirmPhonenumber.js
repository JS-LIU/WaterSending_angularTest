/**
 * Created by 殿麒 on 2015/9/18.
 */

logIn.controller('inputPhonenum',function($rootScope,$scope){
    $scope.getNumber = function(){
        $rootScope.PHONENUM = $scope.phoneNum;
        $rootScope.PHONELOC = $scope.phoneLoc;
        $rootScope.ISSHOW = true;
    }
});

logIn.controller('confirmPhonenum',function($rootScope,$scope){
    $scope.cancel = function(){
        $rootScope.ISSHOW = false;
    }
    $scope.ok = function(){
        $rootScope.ISSHOW = false;
    }
})