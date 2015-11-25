/**
 * Created by 殿麒 on 2015/11/25.
 */

(function(){
    angular
        .module('myApp')
        .controller('mapCtrl',mapCtrl);

    function mapCtrl(Map){
        //  画出地图
        var map = new Map();
        //  得到当前经纬度
        map.getNowLnglat();
    }
}())



