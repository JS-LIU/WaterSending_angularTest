/**
 * Created by 殿麒 on 2015/9/21.
 */

purchase.controller('payGoodsModel',function($scope,$cookieStore){

    var payGoodsList = [];

    ////  所有 要被付款的商品
    //for(var i = 0,len = $cookieStore.get('checkedList').length;i < len ; i++){
    //    if($cookieStore.get('checkedList')[i].ischecked == true){
    //        $cookieStore.get('checkedList').splice(i,1);
    //        payGoodsList.push($cookieStore.get('checkedList')[i]);
    //    }
    //}

    $scope.payGoodsList = payGoodsList;
});


//  对话框
purchase.directive('dialog',function(){
    function link($scope,ele){
        var window_width = window.screen.availWidth,
            dialog_left = (window_width - 235) / 2,
            window_height = window.screen.availHeight,
            dialog_header = parseFloat($('.dialog-header').css('height'))||0,
            dialog_center =  parseFloat($('.dialog-center').css('height')) || 0,
            dialog_bottom =  parseFloat($('.dialog-bottom').css('height')) || 0,
            dialog_height = dialog_header + dialog_center + dialog_bottom,
            dialog_top = (window_height - dialog_height) / 2;

        ele.css({'left':dialog_left + 'px','top':dialog_top + 'px'});
    }

    return {
        restrict:'E',
        template:'<div class="dialog-main" ng-transclude></div>',
        transclude:true,
        link:link
    }
});

//  判断是否登录
purchase.factory('log',function($cookieStore){
    var isLogin = function(){
        if($cookieStore.get('logMsg') != undefined){
            return true;
        }else{
            return false;
        }
    }
    return {
        login:isLogin
    };
})


purchase.factory('goodsCartcookie',function($cookieStore){
    function addCookie(cookieList,addProduct){
        //  添加cookie
        if(cookieList == undefined){
            addProduct.num = 1;
            addProduct.isChecked = true;
            $cookieStore.put('goodscart_list',[addProduct]);
        }else{
            //  cookie对象中的值不知道怎么改 百度说重写就修改了
            var new_goodscart_list = cookieList;
            //  查重
            for(var i = 0, len = new_goodscart_list.length;i < len;i++){
                if(new_goodscart_list[i].productId == addProduct.productId){
                    new_goodscart_list[i].num += 1;
                    $cookieStore.put('goodscart_list',new_goodscart_list);
                    console.log($cookieStore.get('goodscart_list'));
                    break;
                }else if(new_goodscart_list[i].productId != addProduct.productId && i == (len - 1)){
                    addProduct.num = 1;
                    addProduct.isChecked = true;
                    console.log(new_goodscart_list);
                    new_goodscart_list.push(addProduct);
                    $cookieStore.put('goodscart_list',new_goodscart_list);
                }
            }
        }
    }

    function changeCookie(){
    }

    return {
        add_goodsCart_cookie:addCookie,
        change_goodsCart_cookie:changeCookie
    }
})



