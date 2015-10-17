/**
 * Created by LIU on 15/9/27.
 */
purchase.controller('goodsListModel',function($rootScope,$scope,$cookieStore,goodsCartcookie,purchasePost,getAccessInfo,refresh){
    var shopInfo = $cookieStore.get('shopInfo');
    console.log(shopInfo);
    //  请求商品信息数据
    var shopId = shopInfo["shopId"];
    var requestPageInfo = {
        pageSize: 6,
        pageNo: 1
    }
    var accessInfo = getAccessInfo.accessInfo;
    var data = {
        requestPageInfo:requestPageInfo,
        accessInfo:accessInfo,
        sign:'meng wei',
        shopId:shopId
    }

    //  请求商品列表
    var path = "shop/productList";
    purchasePost.postData(data,path).success(function(data){
        $scope.goodsList = data['productList'];
    })

    $scope.showWay1 = true;
    $scope.showWay2 = false;
    $scope.cutShowway = function(){
        $scope.showWay1 = $scope.showWay2;
        $scope.showWay2 = !$scope.showWay2;
    }
    //  添加购物车
    $scope.addGoodscart = function(item){

        var goodscart_list = $cookieStore.get('goodscart_list');
        $rootScope.GOODSCART_NUM += 1;
        $rootScope.GOODSCART_MONEY += item.price;

        //  添加cookie
        goodsCartcookie.add_goodsCart_cookie(goodscart_list,item);
    }


    refresh.getNewdata(window);


});

purchase.controller('shopInfo',function($scope,$cookieStore){
    var shopInfo = $cookieStore.get('shopInfo');

    $scope.shopImg = shopInfo["imageList"][0].url;
    $scope.merchantName = shopInfo["merchantName"];
    $scope.shopAddress = shopInfo["address"];
    $scope.shopDistance = shopInfo["distance"];
    $scope.sellCount = shopInfo["monthSailCount"];
});

purchase.factory('refresh',function($swipe){
    function getNewdata(ele){
        var screenH = window.screen.availHeight;
        //  请求后需要重新获取页面高度
        var bodyH = document.body.scrollHeight;
        $(window).scroll(function(){
            var overScroll = document.body.scrollTop;
            console.log(overScroll);
            console.log(screenH);
            //  卷去的高 + 屏幕的高 == 整个页面的高
            if(overScroll + screenH == bodyH){
                console.log(1);
                var x;
                $swipe.bind(ele, {
                    'start': function() {
                    },
                    'move': function(coords) {
                        //  等待优化
                        x = coords.x;
                        console.log(x);
                    },
                    'end': function(coords) {
                    }
                });
            }
        })

        //func();
    }
    return {
        getNewdata:getNewdata
    }
});
