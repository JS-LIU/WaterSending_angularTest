/**
 * Created by 殿麒 on 2015/10/27.
 */
main.controller('orderListModel',function($scope,$cookieStore,mainPost,getAccessInfo,log,getSelfUrl){

    var myUrl = getSelfUrl.myUrl;
    $cookieStore.put('myUrl',myUrl);

    //  头部【选项卡】数据
    $scope.tab = [{
        name:"待付款",
        icon:"order-goods-noPay",
        clientOrderState:1
    },{
        name:"待收货",
        icon:"order-goods-noReciving",
        clientOrderState:2
    },{
        name:"待评价",
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
                console.log(data);
                $scope.orderList = data["orderList"];
            });
        }

        $scope.stateToWord = function(val){
            var words = ['付款','待确认','评价'];
            return words[covertState(val)];
        }

        var path = 'order/list'
        mainPost.postData(data,path).success(function(data){
            $scope.orderList = data["orderList"];
        });
    }else{
        var host = window.location.host;
        var contextPath = document.location.pathname;
        var index = contextPath.substr(1).indexOf("/");
        contextPath = contextPath.substr(0, index + 1);

        var url = "http://" + host + contextPath + "/";
        window.location.href = url+"app/07-log.html#/";
    }

    var clientOrderState = [1,2,3];
    function topay(item){
        item.final_fee = (item.total_fee / 100).toFixed(2);
        $cookieStore.put('orderId',item);
        window.location.href = this.url;
    }
    function confirmOrder(item){
        var item = item;
        var path = "user/recv";
        var orderId = item.orderId;
        var data = {
            orderId:orderId,
            sign:'sign',
            accessInfo:getAccessInfo.loginAccessInfo()
        }
        mainPost.postData(data,path).success(function(){
            $scope.orderList.splice($.inArray(item,$scope.orderList),1);
        }).error(function(errorData){
            console.log(errorData);
        })
    }
    var host = window.location.host;
    var contextPath = document.location.pathname;
    var index = contextPath.substr(1).indexOf("/");
    contextPath = contextPath.substr(0, index + 1);

    var url = "http://" + host + contextPath;
    var actionsArr = [{
        url: url + "/app/09-payPage.html",
        action: topay
    },{
        action:confirmOrder
    }];

    function covertState(state){
        return clientOrderState.indexOf(state);
    }

    $scope.toGo = function(item){
        var i = covertState(item.clientOrderState);
        actionsArr[i].action(item);
    }
});
main.controller('goodsModel',function($scope){
    $scope.goodsList = $scope.orderList[$scope.$index].orderItems;
});