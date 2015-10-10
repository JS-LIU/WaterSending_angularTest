/**
 * Created by LIU on 15/9/27.
 */
purchase.controller('goodscartBottom',function($rootScope,$scope,$cookieStore,purchasePost,log,$location){
    var path = '#/confirmOrder';
    var url = "07-log.html";

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


    //  点击【购物车】按钮
    $scope.showgoodsCart = function(){
        var new_goodscart_list = $cookieStore.get('goodscart_list');

        for(var i = 0,len = new_goodscart_list.length;i < len;i++){
            new_goodscart_list[i].isChecked = true;
        }
        $cookieStore.put('goodscart_list',new_goodscart_list);
    }
    $rootScope.ALLCHECKED = true;

    //  全选
    $scope.checkAll = function(){
        var goodscartList = $cookieStore.get('goodscart_list');
        $rootScope.ALLCHECKED = !$rootScope.ALLCHECKED;
        //  非全选状态下
        if($rootScope.ALLCHECKED == true){

            for(var i = 0,len = goodscartList.length; i < len;i++){
                $rootScope.TOTLE_MONEY += (goodscartList[i].num * goodscartList[i].price);
            }
            //  上面所有的都有对勾
            $('.goodsCheck').addClass('checked');
            goodsCheckModel(true,goodscartList);
        }else{
            goodsCheckModel(false,goodscartList);
            $rootScope.TOTLE_MONEY = 0;
            $('.goodsCheck').removeClass('checked');
        }
    }
    $scope.toPay = function(){
        var goodscartList = $cookieStore.get('goodscart_list');

        if(log.login()){
            console.log(goodscartList);
            cookieCheckedgoods(goodscartList);
            $scope.gopayhref = path;
            var data = checkedGoodsData();
            var postPath = '/order/new';
            purchasePost.postData(data,postPath);
        }else{
            $scope.gopayhref = url;
        }
    }

    function goodsCheckModel(ischeck,goodscartlist){
        for(var i = 0,len = goodscartlist.length; i < len;i++){
            goodscartlist[i].isChecked = ischeck;
        }
    }

    function cookieCheckedgoods(goodscartlist){
        var new_goodscart_list = [];
        var checked_goodscart_list = [];
        for(var i = 0,len = goodscartlist.length;i < len;i++){
            if(goodscartlist[i].isChecked == false){
                new_goodscart_list.push(goodscartlist[i]);
                console.log(new_goodscart_list);
            }else{
                checked_goodscart_list.push(goodscartlist[i]);
                console.log(checked_goodscart_list);
            }
        }
        $cookieStore.put('goodscart_list',new_goodscart_list);
        $cookieStore.put('order_goodslist',checked_goodscart_list);
        console.log($cookieStore.get('order_goodslist'));
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
