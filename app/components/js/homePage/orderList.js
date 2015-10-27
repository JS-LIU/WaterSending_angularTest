/**
 * Created by 殿麒 on 2015/10/27.
 */
main.controller('orderListModel',function($rootScope,$scope,mainPost,getAccessInfo,log){
    if(log.login()){
        var accessInfo = getAccessInfo.loginAccessInfo();
        var requestPageInfo = {
            pageSize:5,
            pageNo:1
        }
        var data = {
            accessInfo:accessInfo,
            requestPageInfo:requestPageInfo,
            sign:'sign'
        }
        console.log(data);
        var path = 'order/list'
        mainPost.postData(data,path).success(function(data){
            console.log(data);

        });
    }else{
        console.log('请登录');
    }
});