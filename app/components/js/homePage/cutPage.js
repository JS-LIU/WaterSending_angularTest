/**
 * Created by 殿麒 on 2015/11/14.
 */
$('.J_cutIcon a').click(function(){
    var $_self = $(this);
    var $_index = $('.J_cutIcon a').index($_self);
    var picArr = [{show:'mainf-ds-c',hide:'mainf-ds-n'},{show:'mainf-dd-c',hide:'mainf-dd-n'},{show:'mainf-wd-c',hide:'mainf-wd-n'}];
    for(var i = 0;i < picArr.length; i++){
        $('.J_cutIcon a').eq(i).removeClass(picArr[i]["show"]);
        $('.J_cutIcon a').eq(i).addClass(picArr[i]["hide"]);
    }
    $('.J_cutIcon a').eq($_index).removeClass(picArr[$_index]["hide"]);
    $('.J_cutIcon a').eq($_index).addClass(picArr[$_index]["show"]);

})