/**
 * Created by µочи on 2015/8/25.
 */
function J_carouselImages($scope){
    $scope.imgs = [
        {src:'components/images/images-395-01.png',text:'first'},
        {src:'components/images/images-395-02.png',text:'sec'}
    ];
}


angular.module('myApp',[]).directive('carouse',function(){

})