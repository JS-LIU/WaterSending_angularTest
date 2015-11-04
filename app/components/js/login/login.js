/**
 * Created by 殿麒 on 2015/9/23.
 */
logIn.controller('logInRequest',function($scope,$http,$cookieStore,logService,getAccessInfo){

    $scope.logInbtn = function(){
        //  获取md5_key
        var accessInfo = getAccessInfo.accessInfo;
        var phoneNum = $scope.phoneNum;
        var pwd = $scope.password;
        var md5_path ='account/md5key';
        var md5_data = {
            accessInfo:accessInfo,
            phone_num:phoneNum,
            sign:'mengwei'
        }
        logService.postData(md5_data,md5_path).success(function(data){
            console.log(data);
            var md5_key = data["md5_keyStr"];
            var md5_user_pwd = hex_md5(phoneNum +　pwd + md5_key);
            var signature = hex_md5("8262af21b2b6457d9c2cec10e08d01b9" + md5_user_pwd);
            var path = 'account/login';
            var accessInfo = {
                app_key:"9631075388a641ee9197f0496685f320",
                signature:signature,
                phone_num:phoneNum
            }
            var logData = {
                accessInfo:accessInfo,
                signature:accessInfo.signature,
                sign:'sign'
            }
            logService.postData(logData,path).success(function(data){
                console.log(data);
                $cookieStore.put('access_token',data);
            });
        });
    }
})




