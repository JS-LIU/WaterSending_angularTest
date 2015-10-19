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
    console.log(data);
    var path = 'shop/shopDetail';
    shopDetailsPost.postData(data,path).success(function(data){
        console.log(data);
    });

    shopDetailsPost.postData()
});