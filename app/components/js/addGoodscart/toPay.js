/**
 * Created by LIU on 15/9/27.
 */
purchase.controller('goodscartBottom',function($rootScope,$scope,$cookieStore,purchasePost,log,$location){
    var path = "#/confirmOrder";
    var url = "07-log.html";
    var old_goodscart_list = $cookieStore.get('goodscart_list');
    console.log(old_goodscart_list);
    $rootScope.GOODSCART_NUM = 0;
    $rootScope.GOODSCART_MONEY = 0;
    if(old_goodscart_list != undefined){
        for(var i = 0, len = old_goodscart_list.length; i < len;i++){
            console.log();
            console.log(old_goodscart_list[i].num);
            $rootScope.GOODSCART_NUM += old_goodscart_list[i].num;
            $rootScope.GOODSCART_MONEY += (old_goodscart_list[i].price * old_goodscart_list[i].num);
        }
    }




    //  监听url是否变化
    $rootScope.$on('$routeChangeSuccess', function () {
        //  判断显示哪种底部样式
        var self_url = $location.url();
        function hideBottom(){
            $scope.showGoodsList = false;
            $scope.showGoodsCart = false;
            $scope.showOrderList = false;
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

    $scope.toPay = function(){
        var goodscartList = $rootScope.GOODSCARTLIST;

        if(log.login()){
            $scope.order_totle = 0;
            console.log(goodscartList);
            //  保存cookie 这里必须保存 付款后从这里可以正确读数据
            cookieCheckedgoods(goodscartList);
            $scope.gopayhref = path;
            var data = checkedGoodsData();
            var postPath = '/order/new';
            purchasePost.postData(data,postPath);
        }else{
            //  登录界面
            $scope.gopayhref = url;
        }
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

    function checkedGoodsData(){
        //  暂时
        var shopId = '123';
        var total_fee = '';
        var description = '';
        var comment = '';
        var checked_goodscart_list = $cookieStore.get('order_goodslist');
        var sign = 'BDA2A96987403A81E3935D0265086018';
        var orderItems = [];
        for(var i = 0,len = checked_goodscart_list.length; i < len;i++){
            var product = {
                productId:checked_goodscart_list[i].productId,
                itemInfo:'github.com/JS-LIU/',
                itemNum:checked_goodscart_list[i].num,
                productType:'',
                itemPrice:''
            }
            orderItems.push(product);
        }
        var accessInfo = $cookieStore.get('logMsg');
        return {
            shopId:shopId,
            total_fee:total_fee,
            description:description,
            comment:comment,
            addressId:'123',
            orderItems:orderItems,
            sign:sign,
            accessInfo:accessInfo
        }
    }
});
