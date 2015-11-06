/**
 * Created by LIU on 15/9/27.
 */
purchase.controller('goodsListModel',function($rootScope,$scope,$cookieStore,goodsCartcookie,purchasePost,log,postclassify,toPay){

    $scope.cutclassify = false;
    $scope.classifyClick = [{name:'商品分类',id:1},{name:'综合排序',id:2}];
    var data = postclassify.data();
    var classifymodle = [{name:'商品分类'},{name:'桶装水',sortWay:{categoryId:0}},{name:'瓶装水',sortWay:{categoryId:1}}];
    var incomeClassify = [{name:'综合排序'},{name:'价格排序',sortWay:{sortType:1}},{name:'销量排序',sortWay:{sortType:2}}];
    //  请求商品列表
    var path = "shop/productList";
    purchasePost.postData(data,path).success(function(data){
        $scope.goodsList = data['productList'];
    });

    $scope.showWay1 = true;
    $scope.showWay2 = false;
    $scope.cutShowway = function(){
        $scope.showWay1 = $scope.showWay2;
        $scope.showWay2 = !$scope.showWay2;
    }
    //  底部购物车商品数量价格
    var goodscart_list = $cookieStore.get('goodscart_list');
    $scope.goodscart_money = 0;
    $scope.goodscart_num = 0;
    if(goodscart_list != undefined){
        for(var i = 0; i < goodscart_list.length;i++){
            $scope.goodscart_num += goodscart_list[i].num;
            var goodscart_money = goodscart_list[i].price * goodscart_list[i].num;
            $scope.goodscart_money += goodscart_money;
        }
    }

    var isLogin = log.login();

    //  添加购物车
    $scope.addGoodscart = function(item){
        if(isLogin){
            var goodscart_list = $cookieStore.get('goodscart_list');
            $scope.goodscart_num += 1;
            $scope.goodscart_money += item.price;
            //  添加cookie
            goodsCartcookie.add_goodsCart_cookie(goodscart_list,item);
        }else{
            window.location.href = "07-log.html";
        }
    }
    //  查看购物车
    $scope.toGoodsCart = function(){
        if(isLogin){
            window.location.href = "#/goodsCart"
        }else{
            window.location.href = "07-log.html";
        }
    }


    $scope.showClassify = function(item){
        $scope.cutclassify = !$scope.cutclassify;
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
        purchasePost.postData(data,path).success(function(data){
            $scope.goodsList = data["productList"];
        });
        $scope.cutclassify = !$scope.cutclassify;
    }

    //  商品详情
    $scope.getGoodsInfo = function(item){
        $rootScope.GOODSINFO = item;
        window.location.href = '#/goodsDetails';
    }
    $scope.toPay = function(){
        var goodsCart_list = $cookieStore.get('goodscart_list') || [];
        toPay.pay(goodsCart_list);
    }
});

//  商店信息
purchase.controller('shopInfo',function($scope,$cookieStore,ramdomStart){
    var shopInfo = $cookieStore.get('shopInfo');

    $scope.shopImg = shopInfo["imageList"][0].url;
    $scope.merchantName = shopInfo["merchantName"];
    $scope.shopAddress = shopInfo["address"];
    $scope.shopDistance = shopInfo["distance"];
    $scope.sellCount = shopInfo["monthSailCount"];

    ramdomStart.getStar($scope,shopInfo.score,$cookieStore.put('shopInfo',shopInfo));
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

purchase.factory('ramdomStart',function(){
    function calcStar(){
        var num = parseInt(Math.random()*5) + 1;
        return num;
    }
    function paintStar($scope,score,saveInfo){
        if(score == 0){
            var newscore = calcStar();
            saveInfo;
        }else{
            var newscore = score;
        }
        var startArr = [];
        for(var i = 0,len = newscore;i < len;i++){
            var obj = {
                src:"components/images/star5.png"
            }
            startArr.push(obj);
        }
        for(var j = 5; j > newscore; j--){
            var obj = {
                src:"components/images/star6.png"
            }
            startArr.push(obj);
        }
        $scope.startArr = startArr;
    }

    return {
        getStar:paintStar
    }
});
purchase.directive('liuul',function($swipe){
    var y,y1,y2;
    function link($scope,ele){
        var clientH = document.body.clientHeight;
        var $_self = $(ele);
        var overScroll = document.body.scrollTop;
        //  请求到数据后需要重新获取值
        var bodyH = document.body.scrollHeight;
        //  卷去的高 + 屏幕的高 == 整个页面的高
        var selfH = parseFloat($_self.css('height'));
        $swipe.bind($_self, {
            'start': function(coords) {
            },
            'move': function(coords) {
                if(overScroll + clientH == bodyH){
                }
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


