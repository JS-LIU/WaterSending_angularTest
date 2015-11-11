/**
 * Created by 殿麒 on 2015/9/28.
 */
main.controller('showListModel',function($scope,$rootScope,refreshData,mainPost,getAccessInfo){
    $rootScope.NAVBOT = false;
    $scope.getShopInfo = function(shopList){
        $rootScope.NEARLIST_SHOP = shopList;
        window.location.href='#/'
    }


    var path = 'shopList/shop';
    var data = function(pageNo,keyword){
        var requestPageInfo = {
            pageSize:5,
            pageNo:pageNo
        }
        var dataObj = {
            accessInfo:getAccessInfo.accessInfo,
            positionInfo:$rootScope.LNGLAT,
            requestPageInfo: requestPageInfo,
            x_dpi:'640',
            sign :'sign',
            keyWord:keyword
        }
        return dataObj;
    }
    refreshData.getMoreData(data(2,''),path,function(getData,data){
        $rootScope.SHOPLIST = $rootScope.SHOPLIST.concat(getData['shopList']);
        data.requestPageInfo.pageNo++;
    });


    //  搜索
    $scope.searchShop = function(e){
        e = e || window.event;
        var key = e.which;
        if(key == 13){
            var keyword = $(e.target).val();
            console.log(data(1,keyword));
            mainPost.postData(data(1,keyword),path).success(function(data){
                console.log(data);
                var shopList = data['shopList'];
                $rootScope.SHOPLIST = shopList;
                $rootScope.NEARLIST_SHOP = shopList[0];
            });
        }
    }

});
