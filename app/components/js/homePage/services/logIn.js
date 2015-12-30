/**
 * Created by LIU on 2015/12/1.
 */
(function(){
    angular
        .module('huipayLogIn',['ngCookies'])
        .service('Login',Login);

    function Login($cookieStore){
        this.cookie = $cookieStore;
        //  测试环境
        this.app_secret = "165416";
        this.md5_app_secret = hex_md5("165416");
        this.appKey = "e330ce4aa98546b3b99329d20e17450b";
        //  正式环境
        //this.app_secret = "5e5cd8e3ccca45c2a5a3b00a5a90cdd5";
        //this.md5_app_secret = hex_md5("5e5cd8e3ccca45c2a5a3b00a5a90cdd5");
        //this.appKey = "cf385992c3fc46cbaebae2c1dae08653";


    }
    Login.prototype.isLogIn = function(){
        if(this.cookie.get('access_token') != undefined){
            return true;
        }else{
            return false;
        }
    }

    //  传一个布尔值 取得不同的accessInfo 不传参数自行判断是否登录取相应accessInfo
    Login.prototype.getAccessInfo = function(cookie,isL){
        //console.log(this.isLogIn());
        var isLogin = isL || this.isLogIn();
        var defineApp_key = this.appKey;
        var defineApp_secret = this.app_secret;
        var defineApp_md5_app_secret = this.md5_app_secret;

        return accessInfo(isLogin,defineApp_key,defineApp_secret,defineApp_md5_app_secret);
    }
    function accessInfo(isL,app_key,app_secret,app_md5_app_secret){
        if(isL){
            var access_token = cookie.get('access_token').access_token;
            var access_token_secret = cookie.get('access_token').access_token_secret;
            return {
                app_key:app_key,
                signature:hex_md5(app_secret + '&' + access_token_secret),
                access_token:access_token
            }
        }else{
            return {
                app_key:app_key,
                signature:app_md5_app_secret
            }
        }
    }
}());