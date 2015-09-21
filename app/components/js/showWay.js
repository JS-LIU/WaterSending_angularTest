/**
 * Created by 殿麒 on 2015/9/21.
 */
purchase.controller('showWay',['$rootScope','$scope',function($rootScope,$scope){

    //  请求商品信息数据
    //  模拟返回数据
    $scope.productData = {"responsePageInfo":{"totalCount":442,"pageSize":2,"pageNo":1},"productList":[{"productId":14614,"imgSrc":"components/images/images-170.png","price":11100,"salesCnt":253,"title":"乐百氏18.9L矿泉水","subTitile":"","summary":"买10送2"},{"productId":14604,"imgSrc":"components/images/images-170.png","price":300,"salesCnt":2000,"title":"测试002","subTitile":"","summary":"买一送一"}]}

    $scope.showWay1 = true;
    $scope.showWay2 = false;
    $scope.cutShowway = function(){
        $scope.showWay1 = $scope.showWay2;
        $scope.showWay2 = !$scope.showWay2;
    }

    //  购物车中的数量
    $rootScope.GOODS_NUM = 0;
    //  购物车中商品数据
    $rootScope.GOODS_CARTLIST = [];
    //  总价
    $rootScope.TOTLE_MONEY = 0;


    //  添加购物车
    $scope.addGoodscart = function($index){

        var selfModel = $scope.productData.productList[$index];
        var goodsPrice = selfModel.price;

        //  加入购物车
        if(selfModel.num == undefined){
            selfModel.num = 1;
            $rootScope.GOODS_CARTLIST.push(selfModel);
        }else{
            selfModel.num += 1;
        }

        //  购物车右上角红标+1
        $rootScope.GOODS_NUM ++;

        //  购物车中钱
        $rootScope.TOTLE_MONEY += goodsPrice;
    }
}]);

purchase.controller('goodscartBottom',['$rootScope','$scope',function($rootScope,$scope){
    $scope.showgC = true;

    $scope.showgoodsCart = function(){
        $scope.showgC = !$scope.showgC;
    }

}]);

purchase.controller('goodsCart',['$rootScope','$scope',function($rootScope,$scope){
    var goodscartListModel = $rootScope.GOODS_CARTLIST;
    $rootScope.DIALOG_SHOW = false;

    $scope.subtract = function($index){
        if(goodscartListModel[$index].num == 1){
            $rootScope.DIALOG_SHOW = true;
        }else{
            goodscartListModel[$index].num --;
        }


    }
    $scope.addGoods = function($index){
        goodscartListModel[$index].num ++;

    }

    $rootScope.NOTREMOVE_GOODS = function(){

    }
    $rootScope.REMOVE_GOODS = function(){

    }


}])
