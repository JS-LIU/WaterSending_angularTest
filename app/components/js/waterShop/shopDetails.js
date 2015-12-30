/**
 * Created by 殿麒 on 2015/10/19.
 */


function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

waterShop.controller('shopDetails',function($scope,$cookieStore,$location,getAccessInfo,shopDetailsPost,log){

    //  当前页面url后缀
    var self_url = GetQueryString("shopId");
    var shopInfo = $cookieStore.get('shopInfo');
    if(self_url != undefined){
        var shopId = self_url;
    }else{
        var shopId = shopInfo["shopId"];
    }
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
        var isFavourite = data.isFavourite;
        $scope.isFaver = "components/images/header-star.png";
        if(log.isLog()){
            if(!isFavourite){
                $scope.collected = function(){
                    var faverPath = "favourite/shop/new";
                    shopDetailsPost.postData(collectedData,faverPath).success(function(){
                        $scope.isFaver = "components/images/order_collectSelect.png";
                    }).error(function(errorData){
                        console.log(errorData);
                    })
                }
            }
        }else{
            $scope.isFaver = "components/images/header-star.png";
        }
    });

    //  收藏店铺
    var collectedData = {
        shopId:shopId,
        sign:'sign',
        accessInfo:getAccessInfo.loginAccessInfo()
    }




});
waterShop.controller('comment',function($scope,$cookieStore,$location,shopDetailsPost){
    //  当前页面url后缀
    var self_url = GetQueryString("shopId");
    var shopInfo = $cookieStore.get('shopInfo');

    if(self_url != undefined){
        var shopId = self_url;
    }else{
        var shopId = shopInfo["shopId"];
    }
    var requestPageInfo = {
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