var navDown = function (menubtn,menuarea) {

    openSidepage = function(){
        $(menuarea).slideDown("fast");
    };

    closeSidepage = function(){
        $(menubtn).removeClass("open");
        $(menuarea).slideUp("fast");
    };

    $(menubtn).on("click", function(e){
        e.preventDefault();
        if($(this).hasClass("open")) {
            closeSidepage();
        } else {
          $(this).addClass("open");
            openSidepage();
        }
    });
};
