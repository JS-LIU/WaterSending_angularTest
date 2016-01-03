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
            template:'<div><img ng-repeat="" ng-src="{{}}" /></div>',
            scope:{img:'='},
            link:link
        }

        function link(scope,iElement){

        }


        return directive;
    }
}());



