/**
 * Created by LIU on 15/9/27.
 */
purchase.controller('goodsListModel',function($rootScope,$scope,$cookieStore,goodsCartcookie){

    //  请求商品信息数据
    //  模拟返回数据
    $scope.productData = {"responsePageInfo":{"totalCount":442,"pageSize":2,"pageNo":1},"productList":[{"productId":14614,"imgSrc":"components/images/images-170.png","price":11100,"salesCnt":253,"title":"乐百氏18.9L矿泉水","subTitile":"","summary":"买10送2"},{"productId":14604,"imgSrc":"components/images/images-170.png","price":300,"salesCnt":2000,"title":"测试002","subTitile":"","summary":"买一送一"}]}

    $scope.showWay1 = true;
    $scope.showWay2 = false;
    $scope.cutShowway = function(){
        $scope.showWay1 = $scope.showWay2;
        $scope.showWay2 = !$scope.showWay2;
    }
    //  添加购物车
    $scope.addGoodscart = function($index){

        var selfModel = $scope.productData.productList[$index];
        var goodsPrice = selfModel.price;
        var productId = $scope.productData.productList[$index].productId;
        var goodscart_list = $cookieStore.get('goodscart_list');

        //  添加cookie
        goodsCartcookie.add_goodsCart_cookie(goodscart_list,$scope.productData.productList[$index]);

        //  购物车中的数量
        $rootScope.GOODS_NUM = 0;
        //  总价
        $rootScope.TOTLE_MONEY = 0;
    }
});