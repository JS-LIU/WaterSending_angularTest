/**
 * Created by 殿麒 on 2015/8/25.
 */
//  轮播轨迹
purchase.service('carouselTrack',function(){
    var self = this;
    var window_width = document.body.clientWidth;
    this.slideLeft = function (){
        var $_carouselAnimate =  $('.carousel-animation');
        var $_carouselAnimateWidth = parseFloat($_carouselAnimate.css('width'));
        $_carouselAnimate.animate({
            marginLeft:'-=' + window_width + 'px'
        },300,function(){
            var mL = getcarouselBoxMl($_carouselAnimate);
            if( mL - 2 * window_width < -$_carouselAnimateWidth){
                $_carouselAnimate.css('marginLeft',-window_width + 'px');
            }
        })
    }
    this.slideRight = function(){
        var $_carouselAnimate =  $('.carousel-animation');
        var $_carouselAnimateWidth = parseFloat($_carouselAnimate.css('width'))-2*window_width;
        $_carouselAnimate.animate({
            marginLeft:'+=' + window_width + 'px'
        },300,function(){
            var mL = getcarouselBoxMl($_carouselAnimate);
            if( mL > -window_width){
                $_carouselAnimate.css('marginLeft',-$_carouselAnimateWidth+'px');
            }
        })
    }
    function getcarouselBoxMl(carouselBox){
        return parseFloat(carouselBox.css('marginLeft'));
    }
});

purchase.directive('carousel',['$swipe','carouselTrack',function ($swipe,carouselTrack){
    function link($scope,ele){
        $scope.$watch('imgs',function(){
            if($scope.imgs != undefined && $scope.imgs.length > 1){
                var imgLen = $scope.imgs.length,
                    window_width = document.body.clientWidth,
                    bigWidth = imgLen * window_width,
                    moveEle = ele.children().css('marginLeft',-window_width+'px');
                ele.css({'width':window_width + 'px','display':'block'});
                moveEle.css({height:'100%',width:bigWidth + 'px'});
                //moveEle.find('img').css('width',window_width+'px');
                var x,x1;
                $swipe.bind(ele, {
                    'start': function(coords) {
                        x = coords.x;
                        //  停止轮播
                    },
                    'move': function(coords) {
                        //  等待优化
                    },
                    'end': function(coords) {
                        x1 = coords.x;
                        var dif = x - x1;
                        //  swipe-left
                        if(dif > 10){
                            carouselTrack.slideLeft();
                        }else if(dif < -9){
                            carouselTrack.slideRight();
                            //  开始轮播
                        }
                    }
                });
            }
        })

    }
    return{
        restrict:'E',
        template:'<div class="clearfix carousel-animation" ng-transclude></div>',
        transclude:true,
        link:link
    }
}])

purchase.controller('carousel',function($scope){
    //  第一张的和最后一张可以用程序推入 待优化
    var imgW = document.body.clientWidth + 'px';
    var imgH = document.body.clientWidth * 0.6 + 'px';
    $scope.$watch('imgs',function(){
        if($scope.imgs != undefined){
            $scope.imgs.splice(0,0,$scope.imgs[0]);
            var len = $scope.imgs.length;
            $scope.imgs.push($scope.imgs[len-1]);
            for(var i = 0;i <= len;i++){
                $scope.imgs[i].width = imgW;
                $scope.imgs[i].height = imgH;
            }
        }
    });
})

