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
            template:'<div><img ng-repeat="adsPic in img" ng-src="{{adsPic.pic}}" /></div>',
            replace: true,
            scope:{img:'=adsPics'},
            link:link
        }

        function link(scope,iElement){
            console.log(scope.adsPics);
        }


        return directive;
    }
}());



