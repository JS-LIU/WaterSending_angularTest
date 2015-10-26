/**
 * Created by 殿麒 on 2015/10/26.
 */
//  带滑动删除功能的列表 li
purchase.directive('liulist',function($swipe){
    var x,x1,x2,$_eleLeft;
    function link($scope,ele){
        $swipe.bind(ele, {
            'start': function() {
                x = 0;
                $(ele).css('left','0px');
                $_eleLeft = parseFloat(ele.css('left'));
            },
            'move': function(coords) {
                x2 = x1 || x;
                x1 = coords.x;
                var dif = x1 - x2;
                console.log()
                if($_eleLeft <= 0 && dif < 0){
                    $(ele).css({
                        left:'+=' + dif +'px'
                    });
                }
            },
            'end': function() {
                var $_eleLeft = parseFloat($(ele).css('left'));
                if($_eleLeft >　-35){
                    $(ele).css('left','-0px');
                }
                if($_eleLeft <　-55){
                    $(ele).css('left','-55px');
                }
            }
        });
    }
    return{
        restrict:'E',
        template:'<li class="pr" ><div ng-transclude></div></li>',
        transclude:true,
        replace:true,
        link:link
    }
});