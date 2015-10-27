/**
 * Created by LIU on 15/9/27.
 */
purchase.controller('goodsListModel',function($rootScope,$scope,$cookieStore,goodsCartcookie,purchasePost,getAccessInfo,postclassify){

    $scope.cutclassify = false;
    $scope.classifyClick = [{name:'商品分类',id:1},{name:'综合排序',id:2}];
    var data = postclassify.data();
    var classifymodle = [{name:'商品分类'},{name:'桶装水',sortWay:{categoryId:0}},{name:'瓶装水',sortWay:{categoryId:1}}];
    var incomeClassify = [{name:'综合排序'},{name:'价格排序',sortWay:{sortType:1}},{name:'销量排序',sortWay:{sortType:2}}];
    //  请求商品列表
    var path = "shop/productList";
    purchasePost.postData(data,path).success(function(data){
        $scope.goodsList = data['productList'];
        console.log(data['productList']);
    });

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

    $scope.showClassify = function(item){
        $scope.cutclassify = !$scope.cutclassify;
        console.log($scope.cutclassify);
        if(item.id == 1){
            $scope.classifyList = classifymodle;
        }
        if(item.id == 2){
            $scope.classifyList = incomeClassify;
        }
    }

    //  选则排序方式
    $scope.select = function(item){
        var obj = item.sortWay;
        var data = postclassify.data(obj);
        console.log($scope.goodsList);
        purchasePost.postData(data,path).success(function(data){
            $scope.goodsList = data["productList"];
        });
        $scope.cutclassify = !$scope.cutclassify;
    }
});

purchase.controller('shopInfo',function($scope,$cookieStore){
    var shopInfo = $cookieStore.get('shopInfo');

    $scope.shopImg = shopInfo["imageList"][0].url;
    $scope.merchantName = shopInfo["merchantName"];
    $scope.shopAddress = shopInfo["address"];
    $scope.shopDistance = shopInfo["distance"];
    $scope.sellCount = shopInfo["monthSailCount"];
});

//  请求（筛选）【商品】post的数据
purchase.factory('postclassify',function($cookieStore,getAccessInfo){
    function data(obj){
        var shopInfo = $cookieStore.get('shopInfo');
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
        for(var prop in obj){
            data[prop]= obj[prop];
        }

        return data
    }
    return {
        data:data
    }
});

//purchase.factory('refresh',function($swipe){
//    function getNewdata(ele){
//        var screenH = window.screen.availHeight;
//        //  请求后需要重新获取页面高度
//        var bodyH = document.body.scrollHeight;
//        $(window).scroll(function(){
//            var overScroll = document.body.scrollTop;
//            console.log(overScroll);
//            console.log(screenH);
//            //  卷去的高 + 屏幕的高 == 整个页面的高
//            if(overScroll + screenH == bodyH){
//                console.log(1);
//                var x;
//                $swipe.bind(ele, {
//                    'start': function() {
//                    },
//                    'move': function(coords) {
//                        //  等待优化
//                        x = coords.x;
//                        console.log(x);
//                    },
//                    'end': function(coords) {
//                    }
//                });
//            }
//        })
//
//        //func();
//    }
//    return {
//        getNewdata:getNewdata
//    }
//});

purchase.directive('liuul',function($swipe){
    var y,y1,y2,$_eleLeft;
    function link($scope,ele){
        $swipe.bind(ele, {
            'start': function() {
                y = 0;
                $(ele).css('bottom','0px');
            },
            'move': function(coords) {
            },
            'end': function() {
            }
        });
    }

    return{
        restrict:'E',
        template:'<ul class="pr" ><div ng-transclude></div></ul>',
        transclude:true,
        replace:true,
        link:link
    }
});


