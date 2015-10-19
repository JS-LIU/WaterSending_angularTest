/**
 * Created by 殿麒 on 2015/9/23.
 */
logIn.controller('logInRequest',function($scope,logService,$http,$cookieStore){

    $scope.logInbtn = function(){
        var phoneNum = $scope.phoneNum;
        var signature = $scope.password + '&' + '165416';


        var appKey = "e330ce4aa98546b3b99329d20e17450b";
        var sign = 'meng wei';
        var md5_signature = hex_md5(signature);
        var path = 'account/login';
        var data = {
            sign : sign,
            accessInfo : {
                app_key : appKey,
                phone_num : phoneNum,
                signature : md5_signature
            }
        }
        logService.events(data,path).success(function(data){
            var access_tooken = data['access_token'];
            console.log(data);
            var new_logMsg = {
                app_key: appKey,
                signature: md5_signature,
                access_token: access_tooken
            }
            $cookieStore.put('logMsg',new_logMsg);
        });
    }
})




