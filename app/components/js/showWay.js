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


purchase.controller('goodsCart',['$rootScope','$scope',function($rootScope,$scope){

}]);

purchase.controller('goodsItem',['$rootScope','$scope',function($rootScope,$scope){
    var goodscartListModel = $rootScope.GOODS_CARTLIST;
    $rootScope.DIALOG_SHOW = false;
    var i = $scope.$index;
    var goodsPrice = goodscartListModel[i].price;
    $scope.isChecked = true;
    $scope.checkGoods = function(){
        $scope.isChecked = !$scope.isChecked;
        var goodsMoney = goodsPrice  * goodscartListModel[i].num;
        if($scope.isChecked == false){
            $rootScope.TOTLE_MONEY -= goodsMoney;
            $rootScope.ALLCHECKED = false;
        }else{
            $rootScope.TOTLE_MONEY += goodsMoney;
            // 判断是否全选
            if($('.goodsCheck').hasClass('checked')){
                $rootScope.ALLCHECKED = true;
            }

        }
    }

    //  购物车[-]
    $scope.subtract = function($index){
        var $_self = $('.J_goodsItem').eq($index);

        if(goodscartListModel[i].num == 1){
            //  弹出对话框
            $rootScope.DIALOG_SHOW = true;
            //  点击取消隐藏对话框
            $rootScope.NOTREMOVE_GOODS = function(){
                $rootScope.DIALOG_SHOW = false;
            }
            //  点击确认删除当前商品
            $rootScope.REMOVE_GOODS = function(){
                $rootScope.DIALOG_SHOW = false;
                $_self.remove();
            }
        }else{
            goodscartListModel[i].num --;
        }
        if($scope.isChecked == true){
            $rootScope.TOTLE_MONEY -= goodsPrice;
        }
    }
    //  购物车[+]
    $scope.addGoods = function(){
        goodscartListModel[i].num ++;
        if($scope.isChecked == true){
            $rootScope.TOTLE_MONEY += goodsPrice;
        }
    }
}]);


purchase.controller('goodscartBottom',['$rootScope','$scope',function($rootScope,$scope){
    $scope.showgC = true;

    $scope.showgoodsCart = function(){
        $scope.showgC = !$scope.showgC;
    }
    $rootScope.ALLCHECKED = true;

    //  全选
    $scope.checkAll = function(){
        $rootScope.ALLCHECKED = !$rootScope.ALLCHECKED;

        //  非全选状态下
        if($rootScope.ALLCHECKED == true){
            var goodscartListModel = $rootScope.GOODS_CARTLIST;

            for(var i = 0,len = goodscartListModel.length; i < len;i++){
                $rootScope.TOTLE_MONEY += (goodscartListModel[i].num * goodscartListModel[i].price);
            }
            //  上面所有的都有对勾
            $('.goodsCheck').addClass('checked');

        }else{
            $rootScope.TOTLE_MONEY = 0;
            $('.goodsCheck').removeClass('checked');
        }
    }
}]);

purchase.directive('dialog',function(){
    function link($scope,ele){
        var window_width = window.screen.availWidth,
            dialog_left = (window_width - 235) / 2,
            window_height = window.screen.availHeight,
            dialog_header = parseFloat($('.dialog-header').css('height'))||0,
            dialog_center =  parseFloat($('.dialog-center').css('height')) || 0,
            dialog_bottom =  parseFloat($('.dialog-bottom').css('height')) || 0,
            dialog_height = dialog_header + dialog_center + dialog_bottom,
            dialog_top = (window_height - dialog_height) / 2;

        ele.css({'left':dialog_left + 'px','top':dialog_top + 'px'});
    }

    return {
        restrict:'E',
        template:'<div class="dialog-main" ng-transclude></div>',
        transclude:true,
        link:link
    }
});
