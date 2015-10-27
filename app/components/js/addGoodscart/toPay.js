/**
 * Created by LIU on 15/9/27.
 */
purchase.controller('goodscartBottom',function($rootScope,$scope,$cookieStore,$location,purchasePost,log,getAccessInfo){
    var path = "#/confirmOrder";
    var url = "07-log.html";
    var old_goodscart_list = $cookieStore.get('goodscart_list');
    $rootScope.GOODSCART_NUM = 0;
    $rootScope.GOODSCART_MONEY = 0;
    if(old_goodscart_list != undefined){
        for(var i = 0, len = old_goodscart_list.length; i < len;i++){
            $rootScope.GOODSCART_NUM += old_goodscart_list[i].num;
            $rootScope.GOODSCART_MONEY += (old_goodscart_list[i].price * old_goodscart_list[i].num);
        }
    }

    //  监听url是否变化
    $rootScope.$on('$routeChangeSuccess', function(){
        //  判断显示哪种底部样式
        var self_url = $location.url();
        function hideBottom(){
            $scope.showGoodsList = false;
            $scope.showGoodsCart = false;
            $scope.showOrderList = false;
            $scope.showBtn = true;
        }
        if(self_url == '/'){
            hideBottom();
            $scope.showGoodsList = true;
        }else if(self_url == '/goodsCart'){
            hideBottom()
            $scope.showGoodsCart = true;
        }else if(self_url == '/confirmOrder'){
            hideBottom();
            $scope.showOrderList = true;
        }else if(self_url == 'receiverAddress'){
            hideBottom();
            $scope.showBtn = false;
        }
    });

    $rootScope.ALLCHECKED = true;

    //  全选
    $scope.checkAll = function(){

        $rootScope.ALLCHECKED = !$rootScope.ALLCHECKED;
        //  非全选状态下
        if($rootScope.ALLCHECKED == true){
            allcheck(true,function(i){
                $rootScope.TOTLE_MONEY += ($rootScope.GOODSCARTLIST[i].num * $rootScope.GOODSCARTLIST[i].price);
            });
        }else{
            $rootScope.TOTLE_MONEY = 0;
            allcheck(false);
        }
    }
    function allcheck(ischeck,func){
        for(var i = 0,len = $rootScope.GOODSCARTLIST.length; i < len; i++){
            $rootScope.GOODSCARTLIST[i].isChecked = ischeck;
            if(func != undefined){
                func(i);
            }
        }
    }
    $scope.order_totle = 0;
    $scope.toPay = function(){
        var goodscartList = $rootScope.GOODSCARTLIST;
        topay(goodscartList);
    }
    //  去付款
    function topay(goodscartList){
        if(log.login()){
            //  保存cookie 这里必须保存 付款后从这里可以正确读数据
            cookieCheckedgoods(goodscartList);
            window.location.href = path;
        }else{
            //  保存cookie 这里必须保存 付款后从这里可以正确读数据
            cookieCheckedgoods(goodscartList);
            //  登录界面
            window.location.href = url;
        }
    }
    $scope.toPay_quick = function(){
        var goodscartList =  $cookieStore.get('goodscart_list');
        topay(goodscartList);
    }
    function cookieCheckedgoods(goodscartlist){
        var new_goodscart_list = [];
        var checked_goodscart_list = [];
        for(var i = 0,len = goodscartlist.length;i < len;i++){

            if(goodscartlist[i].isChecked == false){
                new_goodscart_list.push(goodscartlist[i]);
            }else{
                checked_goodscart_list.push(goodscartlist[i]);
                $scope.order_totle += (goodscartlist[i].num * goodscartlist[i].price);
            }
        }
        $cookieStore.put('goodscart_list',new_goodscart_list);
        $cookieStore.put('order_goodslist',checked_goodscart_list);
    }
    //  生成订单
    $scope.confirmOrder = function(){
        var shopId = $cookieStore.get('shopInfo').shopId;
        var order_list = $cookieStore.get('order_goodslist');
        var orderItem = [];

        for(var i = 0,len  = order_list.length; i < len;i++){
            var item = {};
            item.productId = order_list[i].productId;
            item.productType = 1;
            item.itemNum = order_list[i].num;
            item.itemPrice = order_list[i].price;
            item.itemInfo = '';
            orderItem.push(item);
        }
        var data = {
            shopId:shopId,
            total_fee:$scope.order_totle,
            description:'',
            comment:'',
            addressId:$rootScope.SELECTADDRESS.addressId,
            orderItems:orderItem,
            accessInfo:getAccessInfo.loginAccessInfo(),
            sign:'sign'
        }
        console.log(data);
        var path = 'order/new';
        purchasePost.postData(data,path).success(function(data){
            console.log(data);
        });
    }
});
