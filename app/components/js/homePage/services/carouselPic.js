/**
 * Created by 殿麒 on 2015/12/1.
 */
(function(){
    angular
        .module('myApp')
        .service('CarouselPic',CarouselPic);

    function CarouselPic($resource,$cookieStore,Login){
        var logIn = Login;
        var x_dpi = document.body.clientWidth;

        $resource('/act/actList',{},{
            getPic:{
                method:'POST',
                params:{
                    x_dpi:x_dpi,
                    sign:'',
                    city_id:010,
                    accessInfo:logIn.getAccessInfo($cookieStore,false)
                },
                isArray:false
            }
        });
    }
}())