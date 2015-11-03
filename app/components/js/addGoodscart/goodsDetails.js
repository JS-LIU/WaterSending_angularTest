/**
 * Created by 殿麒 on 2015/11/3.
 */

purchase.controller('goodsDetails',function($rootScope,$scope,$location,purchasePost,getAccessInfo){
    console.log($rootScope.GOODSINFO);
    var self_url = $location.url();
    console.log(self_url);
    console.log(self_url.productId);
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
    console.log(data);
    var path = 'product/detail';
    purchasePost.postData(data,path).success(function(data){
        console.log(data);
    });
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