jQuery.systemalt = function(content, type, speed) {
    if (speed == null) speed = 1500;
    $("body").append("<div id=\"systemalt\" class=\"systemalt\"><div>" + content + "</div></div>");
    switch (type) {
        case jQuery.systemalt.type.success:
            $("#systemalt").toggleClass("systemaltsuccess");
            break;
        case jQuery.systemalt.type.failure:
            $("#systemalt").toggleClass("systemaltfailure");
            break;
    }
    setTimeout("$('#systemalt').remove();", speed);
};
jQuery.systemalt.type = { success: 'Success', failure: 'Failure' }