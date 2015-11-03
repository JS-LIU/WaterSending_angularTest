/**
 * Created by 殿麒 on 2015/11/3.
 */

purchase.controller('goodsDetails',function($rootScope,$scope,$location,$cookieStore,goodsCartcookie,purchasePost,getAccessInfo){
    var self_url = $location.url();

    if(self_url.productId != undefined){
        var productId = self_url.productId;
    }else{
        var productId = $rootScope.GOODSINFO.productId;
    }
    var data = {
        productId:productId,
        sign:'sign',
        accessInfo:getAccessInfo.accessInfo
    }
    var path = 'product/detail';
    purchasePost.postData(data,path).success(function(data){
        var imgs = data.productInfo.images;
        //  这里因为数组中是字符串不是对象所以需要想将字符串变为对象
        var imgArr = [];
        for(var i = 0,len = imgs.length; i < len;i++){
            var obj = {src:imgs[i]};
            imgArr.push(obj);
        }
        $scope.imgs = imgArr;
        $scope.goodsName = data.productInfo.title;
        $scope.saleNum = data.productInfo.salesCnt;
        $scope.limitBuy = data.productInfo.subTitle;
        $scope.nowSale = data.productInfo.price;
        $scope.originSale = data.productInfo.marketPrice || $scope.nowSale;
        console.log(data);
        $scope.goodsInfo = data.productInfo;
    });
    $scope.addGoodscart = function(){
        var goodscart_list = $cookieStore.get('goodscart_list');
        $rootScope.GOODSCART_NUM += 1;
        $rootScope.GOODSCART_MONEY += $scope.goodsInfo.price;
        //  添加cookie
        goodsCartcookie.add_goodsCart_cookie(goodscart_list,$scope.goodsInfo);
    }
});

purchase.controller('comment',function($scope,$cookieStore,purchasePost){
    var shopInfo = $cookieStore.get('shopInfo');
    var shopId = shopInfo["shopId"];
    var requestPageInfo = {
        pageNo:1,
        pageSize:2
    };
    var data = {
        shopId:shopId,
        requestPageInfo:requestPageInfo
    }
    var path = 'shop/reviewList';
    purchasePost.postData(data,path).success(function(data){
        $scope.totalCount = data["responsePageInfo"].totalCount;
        $scope.item_respList = data["item_respList"];
        console.log(data);
    });
});