/**
 * Created by 殿麒 on 2015/11/1.
 */
a.directive('liuul',function($swipe){
    function link($scope,ele){
        var $_self = $(ele);
        $swipe.bind(ele,{
            'start':function(){

            },
            'move':function(){
                //  判断是否还能移动
                $(window).scroll(function(){

                });
            }
        })
    }
    return{
        restrict:'E',
        template:'<ul class="pr" ><div ng-transclude></div></ul>',
        transclude:true,
        replace:true,
        link:link
    }
});