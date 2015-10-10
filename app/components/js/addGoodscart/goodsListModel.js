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

        //  添加cookie
        goodsCartcookie.add_goodsCart_cookie(goodscart_list,item);

        //  购物车中的数量
        $rootScope.GOODS_NUM = 0;
        //  总价
        $rootScope.TOTLE_MONEY = 0;
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

purchase.factory('postGoodsList',function($http){
    var url = 'http://192.168.1.39:8080';
    var postData = function(data,path){
        return $http({
            method:'POST',
            url: url + path,
            data: data,
            headers:{'Content-Type':'application/json'},
        });
    }
    return {
        postData: function(data,path){
            return postData(data,path,'postData');
        }
    }
})