/**
 * Created by 殿麒 on 2015/8/25.
 */

var obj = new Object();

obj.triggerOnce = function(fn) { //控制让函数只触发一次
    return function() {
        try {
            fn.apply(this, arguments);
        }
        catch (e) {
            var txt = "There was an error on this page.\n\n";
            txt += "Error message: " + e.message + "\n\n";
            txt += "Error name: " + e.name + "\n\n";
        }
        finally {
            fn = null;
        }
    }
}

main.service('carouselTrack',function(){
    var self = this;
    var window_width = window.screen.availWidth;
    this.slideLeft = function (){
        var $_carouselAnimate =  $('.carousel-animation');
        var $_carouselAnimateWidth = parseFloat($_carouselAnimate.css('width'));
        $_carouselAnimate.animate({
            marginLeft:'-=' + window_width + 'px'
        },300,function(){
            var mL = parseFloat($_carouselAnimate.css('marginLeft'));
            if( mL - 2 * window_width < -$_carouselAnimateWidth){
                $_carouselAnimate.css('marginLeft','0px');
            }
        })
    }
    this.slideRight = function(){
        var $_carouselAnimate =  $('.carousel-animation');
        $_carouselAnimate.animate({
            marginLeft:'+=' + window_width + 'px'
        },300,function(){
            var mL = parseFloat($_carouselAnimate.css('marginLeft'));
            if( mL - 2 * window_width > 0){
                $_carouselAnimate.css('marginLeft','0px');
            }
        })
    }

});

main.directive('carousel',['$swipe','carouselTrack',function ($swipe,carouselTrack){
    function link($scope,ele){
        var imgLen = $scope.imgs.length,
            window_width = window.screen.availWidth,
            bigWidth = imgLen * window_width,
            moveEle = ele.children();

        $scope.w = bigWidth;

        ele.css({'width':window_width + 'px','display':'block'});
        moveEle.css({height:'395px',width:bigWidth + 'px'});
        var x,x1;

        $swipe.bind(ele, {
            'start': function(coords) {
                x = coords.x;
            },
            'move': function(coords) {
                x = x1 || coords.x;
                x1 = coords.x;
                var dif = x - x1;
                //  swipe-left
                if(dif > 0){
                    carouselTrack.slideLeft();
                }
            },
            'end': function() {
                console.log(1);
            },
            'cancel': function() {
                console.log(2);
            }
        });
    }
    return{
        restrict:'E',
        template:'<div class="clearfix carousel-animation" ng-transclude></div>',
        transclude:true,
        link:link
    }
}])

main.controller('myInterval',function($scope,$interval,carouselTrack){
    //$interval(carouselTrack.slideLeft,$scope.myInterval);
})


function carousel($scope){
    $scope.imgs = [
        {src:'components/images/images-395-01.png',text:'first'},
        {src:'components/images/images-395-02.jpg',text:'sec'},
        {src:'components/images/images-395-01.png',text:'first'}
    ];
    $scope.myInterval = 1000;
}

