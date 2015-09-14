/**
 * Created by ���� on 2015/8/25.
 * ���js�ļ����Էָ�Ϊ2-4�� �������Ż�
 */
//  ��Ϊfactory ��directiveע�����
//  �ֲ��켣
main.service('carouselTrack',function(){
    var self = this;
    var window_width = window.screen.availWidth;
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

main.directive('carousel',['$swipe','carouselTrack',function ($swipe,carouselTrack){
    function link($scope,ele){
        var imgLen = $scope.imgs.length,
            window_width = window.screen.availWidth,
            bigWidth = imgLen * window_width,
            moveEle = ele.children().css('marginLeft',-window_width+'px');

        ele.css({'width':window_width + 'px','display':'block'});
        moveEle.css({height:'395px',width:bigWidth + 'px'});
        //moveEle.find('img').css('width',window_width+'px');
        var x,x1;

        $swipe.bind(ele, {
            'start': function(coords) {
                x = coords.x;
                //  ֹͣ�ֲ�
            },
            'move': function(coords) {
                //  �ȴ��Ż�
            },
            'end': function(coords) {
                x1 = coords.x;
                var dif = x - x1;
                //  swipe-left
                if(dif > 10){
                    carouselTrack.slideLeft();
                }else if(dif < -9){
                    carouselTrack.slideRight();
                    //  ��ʼ�ֲ�
                }
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

main.controller('myInterval',function($scope,carouselTrack){
    var t = setInterval(carouselTrack.slideLeft,$scope.myInterval);
})


main.controller("carousel",function($scope){
    //  ��һ�ŵĺ����һ�ſ����ó������� ���Ż�
    var imgW = window.screen.availWidth + 'px';
    $scope.imgs = [
        //  ���������һ�ŵĸ���
        {src:'components/images/images-395-02.jpg',text:'sec',width:imgW},
        //  ͼƬ����
        {src:'components/images/images-395-01.png',text:'first',width:imgW},
        {src:'components/images/images-395-02.jpg',text:'sec',width:imgW},
        //  �����ǵ�һ�ŵĸ���
        {src:'components/images/images-395-01.png',text:'first',width:imgW}
    ];
    $scope.myInterval = 5000;
});

