/**
 * Created by LIU on 15/9/27.
 */
purchase.controller('goodsCart',function($scope,$rootScope,$cookieStore,toPay){
    //  将购物车中【商品信息】绑定到rootscope中
    $scope.goodscartList = $cookieStore.get('goodscart_list') || [];
    //  是否显示【对话框】
    $rootScope.DIALOG_SHOW = false;
    //  总价
    $scope.totleMoney = 0;
    //  默认下面的【全选按钮】为【选中】状态
    $scope.allcheck = true;

    //  到购物车默认全选商品
    for(var i = 0 ;i < $scope.goodscartList.length; i++){
        $scope.goodscartList[i].isChecked = true;
        $scope.totleMoney += ($scope.goodscartList[i].price * $scope.goodscartList[i].num);
    }

    //  点击商品的【选择按钮】取消/选中 该商品
    $scope.checkGoods = function(goodsInfo){
        goodsInfo.isChecked = !goodsInfo.isChecked;
        //  该商品价格
        var goodsMoney = (goodsInfo.price * goodsInfo.num);
        //  判断是否被选择；
        if(goodsInfo.isChecked){
            $scope.totleMoney += goodsMoney;
            //  判断是否全选
            for(var i= 0,len = $scope.goodscartList.length; i < len; i++){
                if($scope.goodscartList[i].isChecked ){
                    if(i == (len-1)){
                        $scope.allcheck = true;
                    }
                }else{
                    $scope.allcheck = false;
                    break;
                }
            }
        }else{
            $scope.allcheck = false;
            $scope.totleMoney -= goodsMoney;
        }
    }

    //  商品【-】
    $scope.subtract = function(goodsInfo){
        if(goodsInfo.num == 1){
            //  弹出对话框
            $rootScope.DIALOG_SHOW = true;
            //  点击取消隐藏对话框
            $rootScope.NOTREMOVE_GOODS = function(){
                $rootScope.DIALOG_SHOW = false;
            }
            //  点击确认删除当前商品
            $rootScope.REMOVE_GOODS = function(){
                $rootScope.DIALOG_SHOW = false;
                //  remove
                $scope.goodscartList.splice($.inArray(goodsInfo,$scope.goodscartList),1);
                $cookieStore.put('goodscart_list',$scope.goodscartList );
                $scope.totleMoney -= goodsInfo.price;
            }
        }else if(goodsInfo.isChecked && goodsInfo.num != 1){
            goodsInfo.num--;
            $scope.totleMoney -= goodsInfo.price;
            $cookieStore.put('goodscart_list',$scope.goodscartList);
        }else if(!goodsInfo.isChecked){
            goodsInfo.num--;
            $cookieStore.put('goodscart_list',$scope.goodscartList);
        }
    }
    //  商品【+】
    $scope.addGoods = function(goodsInfo){
        goodsInfo.num++;
        if(goodsInfo.isChecked){
            $scope.totleMoney += goodsInfo.price;
        }
        $cookieStore.put('goodscart_list',$scope.goodscartList);
    }
    //  全选
    $scope.checkall = function(){
        if($scope.allcheck){

            checkAll(false,$scope.goodscartList,function(){
                $scope.allcheck = false;
                $scope.totleMoney = 0.00;
            });
        }else{
            $scope.totleMoney = 0;
            checkAll(true,$scope.goodscartList,function(){
                $scope.allcheck = true;
            });


        }
    }
    //  全选
    function forEach(list,func){
        for(var i = 0; i < list.length;i++){
            func(i);
        }
    }
    //  全选
    function checkAll(boolean,list,func){
        forEach(list,function(i){
            list[i].isChecked = boolean;
            $scope.totleMoney += list[i].num * list[i].price;
        });
        func();
    }

    $scope.toPay = function(){
        toPay.pay($scope.goodscartList);
    }
});