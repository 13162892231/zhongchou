$(function () {
    $(".content_first img").click(function () {
        $(this).parent().parent().find(".content_sencent").toggle();
    });
});