/**
 * Created by LIU on 2015/11/27.
 */

(function(){
    angular
        .module('huipayCarcousel',['myApp'])
        .directive('carcousel',carcousel)

    function carcousel(){
        var directive = {
            restrict: 'EA',
            template:'<ul ng-transclude></ul>',
            transclude: true,
            link:link
        }

        function link(scope,iElement){
            return;
        }


        return directive;
    }
}());



