/**
 * Created by 殿麒 on 2015/12/1.
 */
(function(){
    angular
        .module('myApp')
        .service('AdvertisePic',AdvertisePic);

    function AdvertisePic($resource,$cookieStore,Login,MyMap){

        var logIn = Login;
        var x_dpi = document.body.clientWidth;

        var accessInfo = logIn.getAccessInfo($cookieStore,false);

        var ActList = $resource('/huipaywater/act/actList',{});

        MyMap.getPoInfo(function(result){
            //  返回城市code
            var city_id = result.addressComponent.citycode;
            //  获取首页轮播图信息
            var actList = ActList.save({},{
                x_dpi:x_dpi,
                sign:'',
                city_id:city_id,
                accessInfo:accessInfo
            });
        })
    }
}());