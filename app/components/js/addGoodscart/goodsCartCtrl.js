/**
 * Created by LIU on 15/9/27.
 */
purchase.controller('goodsCart',function($scope,$cookieStore){
    $scope.goodscartList_model = $cookieStore.get('goodscart_list');
    console.log($cookieStore.get('goodscart_list'));
});

purchase.controller('goodsItem',function($rootScope,$scope,$cookieStore){
    var goodscartListModel = $cookieStore.get('goodscart_list');
    var i = $scope.$index;
    var goodsPrice = goodscartListModel[i].price;

    $scope.goodscart_Item = goodscartListModel[i];
    $rootScope.DIALOG_SHOW = false;
    $scope.isChecked = true;

    $scope.checkGoods = function(){
        $scope.isChecked = !$scope.isChecked;
        goodscartListModel[i].isChecked = !goodscartListModel[i].isChecked;

        var goodsMoney = goodsPrice * goodscartListModel[i].num;
        if($scope.goodscart_Item.isChecked == false){
            $rootScope.TOTLE_MONEY -= goodsMoney;
            $rootScope.ALLCHECKED = false;
        }else{
            $rootScope.TOTLE_MONEY += goodsMoney;
            // 判断全选是否打钩
            for(var j = 0,len = goodscartListModel.length;j < len;j++){
                if(goodscartListModel[j].isChecked == true && j == (len - 1)){
                    $rootScope.ALLCHECKED = true;
                }
            }
        }
        $cookieStore.put('goodscart_list',goodscartListModel);
    }

    //  购物车[-]
    $scope.subtract = function(){
        if(goodscartListModel[i].num == 1){
            //  弹出对话框
            $rootScope.DIALOG_SHOW = true;
            //  点击取消隐藏对话框
            $rootScope.NOTREMOVE_GOODS = function(){
                $rootScope.DIALOG_SHOW = false;
            }
            //  点击确认删除当前商品
            $rootScope.REMOVE_GOODS = function(){
                $rootScope.DIALOG_SHOW = false;
                $scope.goodscartList_model.splice(i,1)
                goodscartListModel.splice(i,1);
                $cookieStore.put('goodscart_list',goodscartListModel);
            }
        }else{
            $scope.goodscartList_model[i].num--;
            goodscartListModel[i].num --;
            $cookieStore.put('goodscart_list',goodscartListModel);
        }
        if($scope.isChecked == true){
            $rootScope.TOTLE_MONEY -= goodsPrice;
        }
    }
    //  购物车[+]
    $scope.addGoods = function(){
        goodscartListModel[i].num ++;
        $scope.goodscartList_model[i].num++;
        if($scope.isChecked == true){
            $rootScope.TOTLE_MONEY += goodsPrice;
        }
        $cookieStore.put('goodscart_list',goodscartListModel);
    }
});