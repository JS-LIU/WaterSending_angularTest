/**
 * Created by 殿麒 on 2015/12/1.
 */
(function(){
    angular
        .module('myApp')
        .service('GetAdvertisePic',GetAdvertisePic);

    function GetAdvertisePic($resource,$cookieStore,$q,Login,MyMap){

        var logIn = Login;
        var x_dpi = document.body.clientWidth;

        var accessInfo = logIn.getAccessInfo($cookieStore,false);

        var defer = $q.defer();
        var ActList = $resource('/huipaywater/act/actList',{});
        MyMap.getPoInfo(function(result){
            //  返回城市code
            var city_id = result.addressComponent.citycode;
            //  获取首页轮播图信息
            ActList.save({},{
                x_dpi:x_dpi,
                sign:'',
                city_id:city_id,
                accessInfo:accessInfo
            },function(data){
                defer.resolve(data);
            });
        })
        return defer.promise;
    }
}());
