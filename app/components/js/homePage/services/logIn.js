/**
 * Created by LIU on 2015/12/1.
 */
(function(){
    angular
        .module('huipayLogIn',[])
        .service('Login',Login);

    function Login(){
        this.app_secret = "5e5cd8e3ccca45c2a5a3b00a5a90cdd5";
        this.md5_app_secret = hex_md5("5e5cd8e3ccca45c2a5a3b00a5a90cdd5");
        this.appKey = "cf385992c3fc46cbaebae2c1dae08653";
    }
    Login.prototype.isLogIn = function($cookieStore){
        console.log($cookieStore);
        if($cookieStore.get('access_token') != undefined){
            return true;
        }else{
            return false;
        }
    }

    //  传一个布尔值 取得不同的accessInfo 不传参数自行判断是否登录取相应accessInfo
    Login.prototype.getAccessInfo = function($cookieStore,isLogin){

        var isLogin = isLogin || this.isLogIn();
        return accessInfo($cookieStore,isLogin);
    }

    function accessInfo($cookieStore,isLogin){
        if(isLogin){
            var access_token = $cookieStore.get('access_token').access_token;
            var access_token_secret = $cookieStore.get('access_token').access_token_secret;
            return {
                app_key:this.appKey,
                signature:hex_md5(this.app_secret + '&' + access_token_secret),
                access_token:access_token
            }
        }else{
            return {
                app_key:this.appKey,
                signature:this.md5_app_secret
            }
        }
    }
}());