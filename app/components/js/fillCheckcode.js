/**
 * Created by 殿麒 on 2015/9/19.
 */
logIn.controller('fillCheckcode',function($scope){

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
});