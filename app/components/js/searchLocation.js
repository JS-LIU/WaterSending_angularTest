//  代码来源：http://lbs.amap.com/api/javascript-api/example/l/1207-2/
main.factory('searchLocation',function(){
    var location = [];
    var detailsLocation = [];

    //输入提示
    function autoSearch(keywords){
        var auto;
        //加载输入提示插件
        AMap.service(["AMap.Autocomplete"], function() {
            var autoOptions = {
                city: "" //城市，默认全国
            };
            auto = new AMap.Autocomplete(autoOptions);
            //查询成功时返回查询结果
            if (keywords.length > 0) {
                auto.search(keywords, function(status, result) {
                    autocomplete_CallBack(result);
                });
            }
        });
    }

    //输出输入提示结果的回调函数
    function autocomplete_CallBack(data) {

        var tipArr = data.tips;
        if (tipArr && tipArr.length > 0) {
            for (var i = 0; i < tipArr.length; i++) {
                var obj = {loc:tipArr[i].name};
                var obj2 = {detailsloc:tipArr[i].district};
                location.push(obj);
                detailsLocation.push(obj2);
                console.log(detailsLocation);
            }
        }
        else {
            autocomplete_CallBack(data);
        }
    }
    return {
        search:autoSearch,
        location:function(){
            var l = location;
            location = [];
            return l;
        }
    }
});

main.controller('search', function($scope,searchLocation){
    //$scope.searchLoc = function(){
    //    searchLocation.search(key);
    //}
    $scope.search = function(e){
        var $_self = $(e.target);
        var keyWord = function(self){
            if(self.val() == ''){

            }
        }
    }
})

main.controller('getLocation',function($scope,searchLocation){
    $('#keyword').keydown(function(){
        $scope.location = searchLocation.location();
    })
});
