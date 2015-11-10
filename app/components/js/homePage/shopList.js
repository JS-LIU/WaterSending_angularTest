/**
 * Created by 殿麒 on 2015/9/28.
 */
main.controller('showListModel',function($scope,$rootScope,refreshData){
    $rootScope.NAVBOT = false;
    $scope.getShopInfo = function(shopList){
        $rootScope.NEARLIST_SHOP = shopList;
        window.location.href='#/'
    }


    refreshData.getMoreData()
});

main.controller('searchShopModel',function($rootScope,$scope){
    console.log($scope.searchShop);
});
