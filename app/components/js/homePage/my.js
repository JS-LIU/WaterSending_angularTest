/**
 * Created by µочи on 2015/11/12.
 */
main.controller('myCtrl',function($scope,$cookieStore,log){
    console.log(log.login());

    if(log.login()){
        $scope.isLog = false;
    }else{
        $scope.isLog = true;
    }

    $scope.logout = function(){
        $cookieStore.remove("access_token");
    }
});