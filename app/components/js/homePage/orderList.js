/**
 * Created by 殿麒 on 2015/10/27.
 */
main.controller('orderListModel',function($rootScope,$scope,mainPost,getAccessInfo,log){
    //  头部【选项卡】数据
    $scope.tab = [{
        name:"待付款",
        icon:"order-goods-noPay",
        clientOrderState:1
    },{
        name:"代收货",
        icon:"order-goods-noReciving",
        clientOrderState:2
    },{
        name:"带评价",
        icon:"order-goods-noEvaluate",
        clientOrderState:3
    }];

    if(log.login()){
        var accessInfo = getAccessInfo.loginAccessInfo();
        var requestPageInfo = {
            pageSize:5,
            pageNo:1
        }
        var data = {
            accessInfo:accessInfo,
            requestPageInfo:requestPageInfo,
            sign:'sign',
            clientOrderState:null
        }

        $scope.orderDetails = function(item){
            data.clientOrderState = item.clientOrderState;
            mainPost.postData(data,path).success(function(data){
                $scope.orderList = data["orderList"];
            });
        }

        var path = 'order/list'
        mainPost.postData(data,path).success(function(data){
            $scope.orderList = data["orderList"];
        });
    }else{
        window.location.href = "http://www.huipay.com/huipaywater/app/07-log.html";

    }
});
main.controller('goodsModel',function($scope){
    $scope.goodsList = $scope.orderList[$scope.$index].orderItems;
});