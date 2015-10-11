/**
 * Created by µî÷è on 2015/10/11.
 */
purchase.controller('receiverLocation',function($scope,$rootScope,$cookieStore,purchasePost,$http){
    var accessInfo = $cookieStore.get('logMsg');
    var position_x = $cookieStore.get('lnglatXY').positionX;
    var position_y = $cookieStore.get('lnglatXY').positionX;
    var addressInfo = $cookieStore.get('lnglatXY').addressInfo;
    var positionInfo = {
        districtId:"",
        addressInfo:addressInfo,
        position_x:position_x,
        position_y:position_y
    }
    var data = {
        accessInfo:accessInfo,
        positionInfo:positionInfo
    }
    var path = "/delieveryAddress/show"
    //purchasePost.postData(data,path).success(function(data){
    //    console.log(data);
    //});
    //  Êý¾ÝÄ£Äâ
    $http.get('components/data/address.json').success(function(data){
        $rootScope.MYADDRESS = data;
        var defaultAddress = $rootScope.MYADDRESS;
        $scope.receiverName = defaultAddress["recieve_name"];
        $scope.receiverPhone = defaultAddress["phone_num"];
        $scope.fullAddress = defaultAddress["phone_num"];
    })
})