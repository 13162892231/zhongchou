jQuery.easytab = function (title, content) {
    $(title + " > li:first").addClass("cur").show();
    $(content + " > li").hide();
    $(content + " > li:first").show();

    $(title + " li").click(function () {
        $(title + " > li").removeClass("cur");
        $(this).addClass("cur");
        $(content + " > li").hide();
        var activeTab = $(this).find("a").attr("tab");
        $("#" + activeTab).fadeIn();
        return false;
    });
};