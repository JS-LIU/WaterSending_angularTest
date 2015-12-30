/**
 * Created by LIU on 2015/11/27.
 */

(function(){
    angular
        .module('huipayCarcousel',[])
        .directive('Carcousel',Carcousel);

    function Carcousel(){
        var directive = {
            restrict: 'EA',
            template:'<div class="clearfix carousel-animation" ng-transclude></div>',
            transclude:true,
            scope:{img:'='},
            link:link
        }

        function link(scope,iElement){

        }


        return directive;
    }
}());



