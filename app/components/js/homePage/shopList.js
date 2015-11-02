/**
 * Created by 殿麒 on 2015/9/28.
 */
main.controller('showListModel',function($scope,$rootScope){
    $rootScope.NAVBOT = false;
    $scope.getShopInfo = function(shopList){
        $rootScope.NEARLIST_SHOP = shopList;
        window.location.href='#/'
    }
});

main.controller('searchShopModel',function($rootScope,$scope){
    console.log($scope.searchShop);
});
