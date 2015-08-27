/**
 * Created by µочи on 2015/8/25.
 */


main.directive('carousel',['$swipe',function($swipe){
    return{
        restrict:'E',
        template:'<div class="clearfix carousel-animation" ng-transclude></div>',
        transclude:true,
        link:function($scope,ele){
            var imgLen = $scope.imgs.length,
                window_width = window.screen.availWidth,
                bigWidth = imgLen * window_width,
                moveEle = ele.children();
            ele.css({'width':window_width + 'px','display':'block'});
            moveEle.css({height:'395px',width:bigWidth + 'px'});

            $swipe.bind(ele, {
                'start': function(coords) {
                    startX = coords.x;
                    pointX = coords.y;
                },
                'move': function(coords) {
                    var delta = coords.x - pointX;
                },
                'end': function(coords) {
                },
                'cancel': function(coords) {
                }
            });



        }
    }
}])

main.controller('myInterval',function($scope,$interval){

    function carouselTrack(){
        var window_width = window.screen.availWidth;
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

    $interval(carouselTrack,$scope.myInterval);
})


function carousel($scope){
    $scope.imgs = [
        {src:'components/images/images-395-01.png',text:'first'},
        {src:'components/images/images-395-02.jpg',text:'sec'},
        {src:'components/images/images-395-01.png',text:'first'}
    ];
    $scope.myInterval = 1000;
}

