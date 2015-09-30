/**
 * Created by 殿麒 on 2015/8/31.
 */

main.controller("cutView", ['$scope', '$rootScope',function($scope,$rootScope){
    $scope.toggleView = function(){
        $rootScope.isshow = !$rootScope.isshow;
    }
}]);

main.controller("mapView",function($rootScope,$scope,get_location,$cookieStore,mainPost,logMsg){
    $cookieStore.remove('lnglatXY');
    $rootScope.isshow = true;
    get_location.paintMap();
    $scope.address = '正在定位...';

    var t = setInterval(function(){

        if($cookieStore.get('lnglatXY') != undefined){
            $scope.address = $cookieStore.get('lnglatXY').addressInfo;
            var data = postShopData($cookieStore.get('lnglatXY'));
            console.log(data);
            mainPost.postData(data,path).success(function(){
                requestPageInfo.pageNo += 1;
            });
            clearInterval(t);
        }
        $scope.$apply();
    },500);

    var requestPageInfo = {
        pageSize:5,
        pageNo:1
    }

    var path = '/shopList/shop';
    function postShopData(positionInfo){
        var data = {
            accessInfo:logMsg.accessInfo,
            positionInfo:positionInfo,
            requestPageInfo: requestPageInfo
        }
        return data;
    }

});
