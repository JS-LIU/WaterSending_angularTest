/**
 * Created by 殿麒 on 2015/9/18.
 */
logIn.directive('dialoger',function(){
    function link($scope,ele){
        var window_width = document.documentElement.clientWidth,
            dialog_left = (window_width - 235) / 2,
            window_height = document.documentElement.clientHeight,
            dialog_header = parseFloat($('.dialog-header').css('height'))||0,
            dialog_center =  parseFloat($('.dialog-center').css('height')) || 0,
            dialog_bottom =  parseFloat($('.dialog-bottom').css('height')) || 0,
            dialog_height = dialog_header + dialog_center + dialog_bottom,
            dialog_top = (window_height - dialog_height) / 2;

        $(ele).css({'left':dialog_left + 'px','top':dialog_top + 'px'});
    }

    return {
        restrict:'E',
        template:'<div class="dialog-main" ng-transclude></div>',
        transclude:true,
        link:link
    }
});