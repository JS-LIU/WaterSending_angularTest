/**
 * Created by µочи on 2015/8/31.
 */

main.controller("cutView", ['$scope', '$rootScope',function($scope,$rootScope){
    $scope.toggleView = function(){
        $rootScope.isshow = !$rootScope.isshow;
    }
}]);

main.controller("mapView",['$rootScope',function($rootScope){
    $rootScope.isshow = true;
}]);

