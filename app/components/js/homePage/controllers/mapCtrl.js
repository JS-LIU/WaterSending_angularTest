/**
 * Created by 殿麒 on 2015/11/25.
 */

(function(){
    angular
        .module('myApp')
        .controller('mapCtrl',mapCtrl)

    function mapCtrl($scope,MyMap,GetAdvertisePic){
        var self = this;

        //  当前位置
        MyMap.paintCurrentPo();
        //  默认显示广告
        self.isAD = true;

        //  切换地图/轮播
        self.changeBtn = function(){
            self.isAD = !self.isAD;
        }
        GetAdvertisePic.then(function(picArr){
            //$scope.adsPics = picArr['activitys'].huipay_ArrStrToarrObj('pic');
            console.log('getAdvPic');
            $scope.adsPics = [{pic:'images/Tem-water.png'}];
            $scope.$watch('adsPics',function(){
                console.log($scope.adsPics + '-------second');
            })

        });
    }
}());



