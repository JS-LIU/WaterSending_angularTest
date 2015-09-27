/**
 * Created by LIU on 15/9/27.
 */
purchase.controller('goodscartBottom',function($rootScope,$scope,$cookieStore,log){
    var path = '#/confirmOrder';
    var url = 'http://localhost:63342/WaterSending_angularTest/app/07-log.html#/';


    $scope.showgC = true;
    $scope.showgoodsCart = function(){
        $scope.showgC = !$scope.showgC;
    }
    $rootScope.ALLCHECKED = true;

    //  全选
    $scope.checkAll = function(){
        var goodscartList = $cookieStore.get('goodscart_list');
        $rootScope.ALLCHECKED = !$rootScope.ALLCHECKED;
        //  非全选状态下
        if($rootScope.ALLCHECKED == true){

            for(var i = 0,len = goodscartList.length; i < len;i++){
                $rootScope.TOTLE_MONEY += (goodscartList[i].num * goodscartList[i].price);
            }
            //  上面所有的都有对勾
            $('.goodsCheck').addClass('checked');
            goodsCheckModel(true,goodscartList);
        }else{
            goodsCheckModel(false,goodscartList);
            $rootScope.TOTLE_MONEY = 0;
            $('.goodsCheck').removeClass('checked');
        }
    }
    $scope.toPay = function(){
        var goodscartList = $cookieStore.get('goodscart_list');

        if(log.login()){
            cookieCheckedgoods(goodscartList);
            $scope.gopayhref = path;
        }else{
            $scope.gopayhref = url;
        }

    }
    function goodsCheckModel(ischeck,goodscartlist){
        for(var i = 0,len = goodscartlist.length; i < len;i++){
            goodscartlist[i].isChecked = ischeck;
        }
    }
    function cookieCheckedgoods(goodscartlist){
        var new_goodscart_list = [];
        for(var i = 0,len = goodscartlist.length;i < len;i++){
            if(goodscartlist[i].isChecked == false){
                new_goodscart_list.push(goodscartlist[i]);
            }
        }
        $cookieStore.put('goodscart_list',new_goodscart_list);
    }
});