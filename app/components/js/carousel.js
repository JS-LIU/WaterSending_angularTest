/**
 * Created by µочи on 2015/8/25.
 */


main.directive('carousel',function(){
    return{
        restrict:'A',
        template:'<div class="clearfix" ng-transclude ></div>',
        transclude:true,
        link:function($scope,ele){
            var imgLen = $scope.imgs.length,
                window_width = window.screen.availWidth,
                bigWidth = imgLen * window_width,
                moveEle = ele.children();
            ele.css('width',window_width + 'px');
            moveEle.css({height:'395px',width:bigWidth + 'px'});

        }

    }
})


main.controller('myInterval',function($scope,$interval){
    //$interval(carouselTime,$scope.myInterval);
})

main.animate('.L-carousel div',function(){
    return{
        enter:carouselTime
    }
})
function carouselTime(){
    var bigBox = document.querySelector('.L-carousel div');
    bigBox.animate({
        marginLeft:'-=20px'
    },200)
}

function carousel($scope){
    $scope.imgs = [
        {src:'components/images/images-395-01.png',text:'first'},
        {src:'components/images/images-395-02.jpg',text:'sec'}
    ];
    $scope.myInterval = 1000;
}
