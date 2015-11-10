/**
 * Created by 殿麒 on 2015/9/23.
 */
logIn.controller('logInRequest',function($scope,$http,$cookieStore,logService,getAccessInfo,getSign){

    $scope.showDialog = true;

    //  读取过来时的url
    var url = $cookieStore.get('myUrl');
    //  绑定后退按钮url
    $scope.lastUrl = url;

    //  为登陆按钮绑定数据
    $scope.logInbtn = function(){
        //  获取md5_key
        var accessInfo = getAccessInfo.accessInfo;
        var phoneNum = $scope.phoneNum;
        var pwd = $scope.password;
        var md5_path ='account/md5key';
        var md5_data = {
            accessInfo:accessInfo,
            phone_num:phoneNum,
            sign:'sign'
        }

        //  请求MD5
        logService.postData(md5_data,md5_path).success(function(data){
            var md5_key = data["md5_keyStr"];
            console.log(md5_key);
            var md5_user_pwd = hex_md5(phoneNum +　pwd + md5_key);
            console.log(phoneNum);
            console.log(pwd);
            console.log(md5_key);
            console.log(md5_user_pwd);
            console.log(123456)
            var signature = hex_md5("5e5cd8e3ccca45c2a5a3b00a5a90cdd5" + md5_user_pwd).toUpperCase();
            var path = 'account/login';
            var accessInfo = {
                app_key:"cf385992c3fc46cbaebae2c1dae08653",
                signature:signature,
                phone_num:phoneNum
            }
            var logData = {
                accessInfo:accessInfo,
                signature:accessInfo.signature
            }
            console.log(logData.signature);
            var sign = getSign.mySign(logData);
            logData.sign = sign;
            logService.postData(logData,path).success(function(data){
                $cookieStore.put('access_token',data);
                window.location.href = url;
            }).error(function(data){
                $scope.showDialog = false;
                $scope.errorInfo = data.errorInfo;
                $scope.ok = function(){
                    $scope.showDialog = true;
                }
            });
        }).error(function(data){
            $scope.showDialog = false;
            $scope.errorInfo = data.errorInfo;
            $scope.ok = function(){
                $scope.showDialog = true;
            }
        });
    }
})




