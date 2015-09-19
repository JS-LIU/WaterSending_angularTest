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

logIn.controller('confirmPhonenum', ['$rootScope','$scope',function($rootScope,$scope){
    $scope.cancel = function(){
        $rootScope.isshow = false;
    }
    $scope.ok = function(){
        //  这里可能使用AJAX向后台发送数据
        $rootScope.isshow = false;
    }
}])