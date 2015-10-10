/**
 * Created by LIU on 15/9/27.
 */
purchase.controller('goodsCart',function($scope,$rootScope,$cookieStore){
    //  将购物车中【商品信息】绑定到rootscope中
    $rootScope.GOODSCARTLIST = $cookieStore.get('goodscart_list');
    //  是否显示【对话框】
    $rootScope.DIALOG_SHOW = false;
    //  总价
    $rootScope.TOTLE_MONEY = 0;
    //  默认下面的【全选按钮】为【选中】状态
    $rootScope.ALLCHECKED = true;

    //  到购物车默认全选商品
    for(var i = 0 ;i < $rootScope.GOODSCARTLIST.length; i++){
        $rootScope.GOODSCARTLIST[i].isChecked = true;
        $rootScope.TOTLE_MONEY += ($rootScope.GOODSCARTLIST[i].price * $rootScope.GOODSCARTLIST[i].num);
    }

    //  点击商品的【选择按钮】取消/选中 该商品
    $scope.checkGoods = function(goodsInfo){
        goodsInfo.isChecked = !goodsInfo.isChecked;
        //  该商品价格
        var goodsMoney = (goodsInfo.price * goodsInfo.num);
        //  判断是否被选择；
        if(goodsInfo.isChecked){
            $rootScope.TOTLE_MONEY += goodsMoney;
            //  判断是否全选
            for(var i= 0,len = $rootScope.GOODSCARTLIST.length; i < len; i++){
                if($rootScope.GOODSCARTLIST[i].isChecked && i == (len-1)){
                    $rootScope.ALLCHECKED = true;
                }
            }
        }else{
            $rootScope.ALLCHECKED = false;
            $rootScope.TOTLE_MONEY -= goodsMoney;
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
                $rootScope.GOODSCARTLIST.splice($.inArray(goodsInfo,$rootScope.GOODSCARTLIST),1);
                $cookieStore.put('goodscart_list',$rootScope.GOODSCARTLIST);
            }
        }else{
            goodsInfo.num--;
            $cookieStore.put('goodscart_list',$rootScope.GOODSCARTLIST);
        }
        if(goodsInfo.isChecked){
            $rootScope.TOTLE_MONEY -= goodsInfo.price;
        }
    }
    //  商品【+】
    $scope.addGoods = function(goodsInfo){
        goodsInfo.num++;
        if(goodsInfo.isChecked){
            $rootScope.TOTLE_MONEY += goodsInfo.price;
            console.log($rootScope.GOODSCARTLIST);
        }
        $cookieStore.put('goodscart_list',$rootScope.GOODSCARTLIST);
    }
});