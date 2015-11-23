/**
 * Created by 殿麒 on 2015/11/14.
 */
$('.J_cutIcon a').click(function(){
    var $_self = $(this);
    var $_index = $('.J_cutIcon a').index($_self);
    var picArr = [{showicon:'mainf-ds-c',hideicon:'mainf-ds-n'},{showicon:'mainf-dd-c',hideicon:'mainf-dd-n'},{showicon:'mainf-wd-c',hideicon:'mainf-wd-n'}];
    for(var i = 0;i < picArr.length; i++){
        $('.J_cutIcon a').eq(i).removeClass(picArr[i].showicon);
        $('.J_cutIcon a').eq(i).addClass(picArr[i].hideicon);
    }

    $('.J_cutIcon a').eq($_index).removeClass(picArr[$_index].hideicon);
    $('.J_cutIcon a').eq($_index).addClass(picArr[$_index].showicon);
})