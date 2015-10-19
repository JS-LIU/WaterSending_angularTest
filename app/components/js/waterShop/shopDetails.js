/**
 * Created by 殿麒 on 2015/10/19.
 */
waterShop.controller('shopDetails',function($scope,$cookieStore,getAccessInfo,shopDetailsPost){
    var shopInfo = $cookieStore.get('shopInfo');
    var shopId = shopInfo["shopId"];
    var data = {
        accessInfo:getAccessInfo.accessInfo,
        sign:'',
        shopId:shopId,
        viewCount:2,
        x_dpi:640
    }
    var path = 'shop/shopDetail';
    shopDetailsPost.postData(data,path).success(function(data){
        console.log(data);
        //  商家地址
        $scope.shopAddress = data["shopAddress"];
        //  商家介绍
        $scope.summary = data["summary"];
        //  商家电话
        $scope.telphone = data["telphone"];
        //  轮播图需要便利
        $scope.imgs = [{src:data["big_image"]}];
        console.log(data["big_image"]);
        console.log($scope.imgs);
    });
});
waterShop.controller('comment',function($scope,$cookieStore,shopDetailsPost){
    var shopInfo = $cookieStore.get('shopInfo');
    var shopId = shopInfo["shopId"];
    var requestPageInfo =     {
        pageNo:1,
        pageSize:2
    };
    var data = {
        shopId:shopId,
        requestPageInfo:requestPageInfo
    }
    var path = 'shop/reviewList';
    shopDetailsPost.postData(data,path).success(function(data){
        $scope.totalCount = data["responsePageInfo"].totalCount;
        $scope.item_respList = data["item_respList"];
        console.log(data);
    })
});