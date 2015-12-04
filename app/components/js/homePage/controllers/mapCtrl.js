/**
 * Created by 殿麒 on 2015/11/25.
 */

(function(){
    angular
        .module('myApp')
        .directive('liu-carousel',carcousel)
        .controller('mapCtrl',mapCtrl)

    function mapCtrl(MyMap,CarouselPic){
        var self = this;
        //  画出地图
        var map = MyMap;
        //  当前位置
        map.getPosition();

        //  默认显示广告
        self.isAD = true;

        //  切换地图/轮播
        self.changeBtn = function(){
            self.isAD = !self.isAD;
        }
        //var carouslPic = CarouselPic
    }
}());



