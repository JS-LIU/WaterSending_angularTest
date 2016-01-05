/**
 * Created by 殿麒 on 2016/1/5.
 */

/*
*   方法用途：将字符串数组转换为对象数组
*       --['huipay','huiyinfeng']  to  [{name:'huipay'},{name:'huiyinfeng'}]
*   参数：对象的key 例子中为：'name'
*
*/
Array.prototype.huipay_ArrStrToarrObj = function(key){
    var self = this;
    for(var i = 0,len = self.length;i < len;i ++){
        var obj = {};
        obj[key] = self[i];
        self[i] = obj;
    }
    return self;
}