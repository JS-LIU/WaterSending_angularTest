/**
 * Created by 殿麒 on 2015/11/25.
 */

(function(){
    angular
        .module('myApp')
        .controller('mapCtrl',mapCtrl);

    function mapCtrl(MyMap){
        //  画出地图
        var map = MyMap;
        //  当前位置
        map.getPosition();
    }
}())



