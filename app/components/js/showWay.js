/**
 * Created by 殿麒 on 2015/9/21.
 */
purchase.controller('showWay',function($rootScope,$scope,$cookieStore){

    //  请求商品信息数据
    //  模拟返回数据
    $scope.productData = {"responsePageInfo":{"totalCount":442,"pageSize":2,"pageNo":1},"productList":[{"productId":14614,"imgSrc":"components/images/images-170.png","price":11100,"salesCnt":253,"title":"乐百氏18.9L矿泉水","subTitile":"","summary":"买10送2"},{"productId":14604,"imgSrc":"components/images/images-170.png","price":300,"salesCnt":2000,"title":"测试002","subTitile":"","summary":"买一送一"}]}

    $scope.showWay1 = true;
    $scope.showWay2 = false;
    $scope.cutShowway = function(){
        $scope.showWay1 = $scope.showWay2;
        $scope.showWay2 = !$scope.showWay2;
    }

    //  cookie中的商品
    if($cookieStore.get('goodscart_list') == undefined){
        $cookieStore.put('goodscart_list',[]);
    }else{
        $cookieStore.get('goodscart_list');
    }
    //  添加购物车
    $scope.addGoodscart = function($index){

        var selfModel = $scope.productData.productList[$index];
        var goodsPrice = selfModel.price;
        var productId = $scope.productData.productList[$index].productId;

        //  查重
        for(var i = 0,len = $cookieStore.get('goodscart_list').length; i < len;i++){

            if($cookieStore.get('goodscart_list')[i].productId == productId){
                $cookieStore.get('goodscart_list')[i].num + 1;
            }else{
                console.log(1);
                $scope.productData.productList[$index].num = 1;
                Array.prototype.push.call($cookieStore.get('goodscart_list'),$scope.productData.productList[$index]);
                console.log($cookieStore.get('goodscart_list'));
            }
        }

        //  购物车中的数量
        $rootScope.GOODS_NUM = 0;
        //  总价
        $rootScope.TOTLE_MONEY = 0;
    }
});


purchase.controller('goodsCart',['$rootScope','$scope',function($rootScope,$scope){

}]);

purchase.controller('goodsItem',function($rootScope,$scope,$cookieStore){
    var goodscartListModel = $cookieStore.get('goodscart_list');
    $scope.goodscart_Item = goodscartListModel;

    $rootScope.DIALOG_SHOW = false;
    var i = $scope.$index;
    var goodsPrice = goodscartListModel[i].price;
    $scope.isChecked = true;

    goodscartListModel[i].ischecked = true;
    $scope.checkGoods = function(){
        $scope.isChecked = !$scope.isChecked;

        goodscartListModel[i].ischecked  = !goodscartListModel[i].ischecked;

        var goodsMoney = goodsPrice * goodscartListModel[i].num;
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
        console.log($cookieStore.get('goodscart_list'));
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
                goodscartListModel.splice(i,1);
                $_self.remove();
                console.log($cookieStore.get('goodscart_list'));
            }
        }else{
            goodscartListModel[i].num --;
        }
        if($scope.isChecked == true){
            $rootScope.TOTLE_MONEY -= goodsPrice;
            console.log($cookieStore.get('goodscart_list'));
        }
    }
    //  购物车[+]
    $scope.addGoods = function(){
        goodscartListModel[i].num ++;
        if($scope.isChecked == true){
            $rootScope.TOTLE_MONEY += goodsPrice;
        }
        console.log($cookieStore.get('goodscart_list'));
    }
});


purchase.controller('goodscartBottom',function($rootScope,$scope,$cookieStore,log){
    var path = '#/confirmOrder';
    var url = 'http://localhost:63342/WaterSending_angularTest/app/07-log.html#/';
    var checkedList = [];
    var uncheckedList = [];
    $scope.showgC = true;

    $scope.showgoodsCart = function(){
        $scope.showgC = !$scope.showgC;
    }
    $rootScope.ALLCHECKED = true;


    $scope.goodscartList = $cookieStore.get('goodscart_list');
    //  全选
    $scope.checkAll = function(goodscartlist){
        $rootScope.ALLCHECKED = !$rootScope.ALLCHECKED;
        //  非全选状态下
        if($rootScope.ALLCHECKED == true){

            for(var i = 0,len = goodscartlist.length; i < len;i++){
                $rootScope.TOTLE_MONEY += (goodscartlist[i].num * goodscartlist[i].price);
            }
            //  上面所有的都有对勾
            $('.goodsCheck').addClass('checked');
            goodsCheck(true,goodscartlist);
        }else{
            goodsCheck(false);
            $rootScope.TOTLE_MONEY = 0;
            $('.goodsCheck').removeClass('checked');
        }
    }
    $scope.toPay = function(){
        if(log.login()){
            $scope.gopayhref = path;
        }else{
            $scope.gopayhref = url;
        }
    }
    function goodsCheck(ischeck,goodscartlist){
        for(var i = 0,len = goodscartlist.length; i < len;i++){
            goodscartlist[i].ischecked = ischeck;
            console.log($cookieStore.get('goodscart_list'));
        }
    }
});


purchase.controller('payGoodsModel',function($scope,$cookieStore){

    var payGoodsList = [];

    //  所有 要被付款的商品
    for(var i = 0,len = $cookieStore.get('checkedList').length;i < len ; i++){
        if($cookieStore.get('checkedList')[i].ischecked == true){
            $cookieStore.get('checkedList').splice(i,1);
            payGoodsList.push($cookieStore.get('checkedList')[i]);
        }
    }

    $scope.payGoodsList = payGoodsList;
});



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


purchase.factory('log',function($cookieStore){
    var isLogin = function(){
        if($cookieStore.get('logMsg') != undefined){
            return true;
        }else{
            return false;
        }
    }
    return {
        login:isLogin
    };
})