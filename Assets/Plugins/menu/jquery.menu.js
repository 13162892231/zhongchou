jQuery.menu = function (sitemenu) {
    var args = {
        timeout: 500,
        closetimer: 0,
        ddmenuitem: 0
    };
    var ddmOpen = function() {
        ddmCanceltimer();
        ddmClose();
        args.ddmenuitem = $(this).find('ul').eq(0).css('visibility', 'visible');
    };
    var ddmClose = function () {
        if (args.ddmenuitem) args.ddmenuitem.css('visibility', 'hidden');
    };
    var ddmTimer = function () {
        args.closetimer = window.setTimeout(ddmClose, args.timeout);
    };
    var ddmCanceltimer = function () {
        if (args.closetimer) {
            window.clearTimeout(args.closetimer);
            args.closetimer = null;
        }
    };
    
    $(sitemenu + ' > li').bind('mouseover', ddmOpen);
    $(sitemenu + ' > li').bind('mouseout', ddmTimer);
    document.onclick = ddmClose;
}