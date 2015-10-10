/**
 * Created by LIU on 15/9/27.
 */
purchase.controller('goodsListModel',function($rootScope,$scope,$cookieStore,goodsCartcookie,postGoodsList,$http){
    var shopInfo = $cookieStore.get('shopInfo');
    //  请求商品信息数据
    var shopId = shopInfo["shopId"];
    var requestPageInfo = {
        pageSize: 5,
        pageNo: 1
    }
    var accessInfo = {
        app_key: "e330ce4aa98546b3b99329d20e17450b",
        signature: "b9528d938a3d6ac64865aee2324d84da"
    }

    var data = {
        requestPageInfo:requestPageInfo,
        categoryId:'',
        sortType:'',
        keyWord:'',
        accessInfo:accessInfo
    }
    //  请求商品列表
    //var path = "/shop/productList";
    //postGoodsList.postData(data,path).success(function(data){
    //    console.log(data);
    //})
    //  本地模拟
    $http.get('components/data/goodsList.json').success(function(data){
        $scope.goodsList = data['productList'];
    });

    $scope.showWay1 = true;
    $scope.showWay2 = false;
    $scope.cutShowway = function(){
        $scope.showWay1 = $scope.showWay2;
        $scope.showWay2 = !$scope.showWay2;
    }
    //  添加购物车
    $scope.addGoodscart = function(item){

        var goodscart_list = $cookieStore.get('goodscart_list');
        $rootScope.GOODS_NUM += 1;
        console.log(item.price);
        console.log($rootScope.GOODSCART_MONEY);
        $rootScope.GOODSCART_MONEY += item.price;

        //  添加cookie
        goodsCartcookie.add_goodsCart_cookie(goodscart_list,item);
    }
});

purchase.controller('shopInfo',function($scope,$cookieStore){
    var shopInfo = $cookieStore.get('shopInfo');

    $scope.shopImg = shopInfo["imageList"][0].url;
    $scope.shopName = shopInfo["shopName"];
    $scope.shopAddress = shopInfo["address"];
    $scope.shopDistance = shopInfo["distance"];
    $scope.sellCount = shopInfo["monthSailCount"];
})
