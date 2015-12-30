/**
 * Created by 殿麒 on 2015/11/3.
 */
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
purchase.controller('goodsDetails',function($rootScope,$scope,$location,$cookieStore,goodsCartcookie,purchasePost,getAccessInfo,log){
    var self_url = GetQueryString("productId");

    if(self_url!= undefined){
        var productId = self_url;
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
    //  添加购物车
    $scope.addGoodscart = function(item){
        if(log.isLog()){
            var goodscart_list = $cookieStore.get('goodscart_list');
            $scope.goodscart_num += 1;
            $scope.goodscart_money += item.price;
            //  添加cookie
            goodsCartcookie.add_goodsCart_cookie(goodscart_list,item);
        }else{
            window.location.href = "07-log.html";
        }
    }
});

purchase.controller('comment',function($rootScope,$scope,$cookieStore,purchasePost){
    var self_url = GetQueryString("productId");

    if(self_url!= undefined){
        var productId = self_url;
    }else{
        var productId = $rootScope.GOODSINFO.productId;
    }
    var requestPageInfo = {
        pageNo:1,
        pageSize:2
    };
    var shopId = $rootScope.GOODSINFO.shopId || GetQueryString("shopId") || null;
    var data = {
        shopId:shopId,
        requestPageInfo:requestPageInfo
    }
    var path = 'shop/reviewList';
    purchasePost.postData(data,path).success(function(data){
        $scope.totalCount = data["responsePageInfo"].totalCount;
        $scope.item_respList = data["item_respList"];
    });
});