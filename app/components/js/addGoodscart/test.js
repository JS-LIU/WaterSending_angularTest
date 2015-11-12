/**
 * Created by µочи on 2015/11/5.
 */



function findBy(list, matchFunction, value){
    for(var index in list){
        if (matchFunction(list[index],value)){
            return {item: list[index], index: index};
        }
    }
}



var findByName = function(list, value){
    return findBy(list, function(item, value){
        return item.name = value;
    },value);
}



function wrapList(list, wraper){
    var newList = [];
    for (var index in list){
        newList.push(wraper(list[index], 0));
    }
    return newList;
}


wrapList(list, function(item, value){
    return {item:item, value:value};
})



message(id, name, xx);
data



