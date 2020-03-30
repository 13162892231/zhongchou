//七牛封装单图
var initQiniuOnly = function (btn, area, datajson) {
    //单图上传
    var onlyQiniu = new QiniuJsSDK();
    var onlyUploader = onlyQiniu.uploader({
        runtimes: 'html5,flash,html4',    //上传模式,依次退化
        browse_button: btn,       //上传选择的点选按钮，**必需**
        uptoken_url: '/Qiniu/GetUptoken?bucket=' + qiniubucket,
        unique_names: true,
        domain: qiniudomain,
        max_file_size: '10mb',           //最大文件体积限制
        flash_swf_url: '/Assets/Plugins/plupload/Moxie.swf',  //引入flash,相对路径
        max_retries: 3,                   //上传失败最大重试次数
        dragdrop: true,                   //开启可拖曳上传
        drop_element: 'container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '4mb',                //分块上传时，每片的体积
        auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
            'FileUploaded': function (up, file, info) {
                var domain = up.getOption('domain');
                var res = $.parseJSON(info);
                var sourceLink = domain + res.key;

                $("#" + area + " img").attr("src", sourceLink);
                $("#" + area + " img").attr("key", res.key);
            }
        }
    });

    if (datajson == null || datajson == "") {
        $("#" + area + " img").attr("src", nullImage);
        $("#" + area + " img").attr("key", "");
    } else {
        $("#" + area + " img").attr("src", qiniudomain + datajson);
        $("#" + area + " img").attr("key", datajson);
    }

    //单图上传清空按钮
    $("#" + area + " .butDel").unbind("click");
    $("#" + area + " .butDel").on("click", function () {
        if ($("#" + area + " img").attr("key") == '') return;
        $("#" + area + " img").attr('src', nullImage);
        $("#" + area + " img").attr("key", '');
    });
};


// 七牛依次上传多图
var initQiniuduo = function (btn, area, datajson, number) {
    $("#"+area).delegate(".detele", "click", function () {
        $(this).parent().parent().remove();
    });
    //单图上传
    var onlyQiniu = new QiniuJsSDK();
    var onlyUploader = onlyQiniu.uploader({
        runtimes: 'html5,flash,html4',    //上传模式,依次退化
        browse_button: btn,       //上传选择的点选按钮，**必需**
        uptoken_url: '/Qiniu/GetUptoken?bucket=' + qiniubucket,
        unique_names: true,
        domain: qiniudomain,
        max_file_size: '10mb',           //最大文件体积限制
        flash_swf_url: '/Assets/Plugins/plupload/Moxie.swf',  //引入flash,相对路径
        max_retries: 3,                   //上传失败最大重试次数
        dragdrop: true,                   //开启可拖曳上传
        drop_element: 'container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '1mb',                //分块上传时，每片的体积
        auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
            'FileUploaded': function (up, file, info) {
                var domain = up.getOption('domain');
                var res = $.parseJSON(info);
                var sourceLink = domain + res.key;
                if ($("#" + area).find(".item").length < number) {
                    var htmlStr = '<div class="item">' +
                        '<img class="itemimg" src="' + sourceLink + '" key="' + res.key + '" />' +
                        '<div><a class="butDel detele">删除</a></div>' +
                        '</div>';
                    $("#" + area).append(htmlStr);
                } else {
                    alert("最多上传" + number + "张图片！");
                }

            }
        }
    });
   
    if (datajson == null || datajson == "") {

    } else {
        for (var i = 0; i < datajson.length; i++) {
            var htmlstr = '<div class="item">' +
                    '<img class="itemimg" src="' + qiniudomain + datajson[i].PhotoUrl + '" key="' + datajson[i].PhotoUrl + '" />' +
                    '<div><a class="butDel detele">删除</a></div>' +
                    '</div>';
            $("#" + area).append(htmlstr);
            //$("#imgHidden").val(datajson[i].PhotoUrl);
        }

    }

    //单图上传清空按钮

};

//七牛截图
var initQiniucut = function (btn, area, proportion, areafine, datajson) {
    //单图上传
    var onlyQiniu = new QiniuJsSDK();
    var onlyUploader = onlyQiniu.uploader({
        runtimes: 'html5,flash,html4',    //上传模式,依次退化
        browse_button: btn,       //上传选择的点选按钮，**必需**
        uptoken_url: '/Qiniu/GetUptoken?bucket=' + qiniubucket,
        unique_names: true,
        domain: qiniudomain,
        max_file_size: '10mb',           //最大文件体积限制
        flash_swf_url: '/Assets/Plugins/plupload/Moxie.swf',  //引入flash,相对路径
        max_retries: 3,                   //上传失败最大重试次数
        dragdrop: true,                   //开启可拖曳上传
        drop_element: 'container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '4mb',                //分块上传时，每片的体积
        auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
            'FileUploaded': function (up, file, info) {
                var domain = up.getOption('domain');
                var res = $.parseJSON(info);
                //获取原图片基本信息
                var imageInfoObj = onlyQiniu.imageInfo(res.key);
                //参数：七牛链接，图片key值，图片基本信息，比例，截图区域，图片存放区域
                cutImage(domain, res.key, imageInfoObj, proportion, area, areafine);
            }
        }
    });

    if (datajson == null || datajson == "") {
        $("#" + areafine + " img").attr("src", nullImage);
        $("#" + areafine + " img").attr("key", "");
    } else {
        $("#" + areafine + " img").attr("src", qiniudomain + datajson);
        $("#" + areafine + " img").attr("key", datajson);
    }
    //单图上传清空按钮
    $("#" + areafine + " .butDel").unbind("click");
    $("#" + areafine + " .butDel").on("click", function () {
        if ($("#" + areafine + " img").attr("key") == '') return;
        $("#" + areafine + " img").attr('src', nullImage);
        $("#" + areafine + " img").attr("key", '');
    });
};



// 七牛依次上传多图截图
var initQiniuMore = function (btn, area, proportion, areafine, areaMore, datajson) {
    //单图上传
    var onlyQiniu = new QiniuJsSDK();
    var onlyUploader = onlyQiniu.uploader({
        runtimes: 'html5,flash,html4',    //上传模式,依次退化
        browse_button: btn,       //上传选择的点选按钮，**必需**
        uptoken_url: '/Qiniu/GetUptoken?bucket=' + qiniubucket,
        unique_names: true,
        domain: qiniudomain,
        max_file_size: '10mb',           //最大文件体积限制
        flash_swf_url: '/Assets/Plugins/plupload/Moxie.swf',  //引入flash,相对路径
        max_retries: 3,                   //上传失败最大重试次数
        dragdrop: true,                   //开启可拖曳上传
        drop_element: 'container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '4mb',                //分块上传时，每片的体积
        auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
            'FileUploaded': function (up, file, info) {
                var domain = up.getOption('domain');
                var res = $.parseJSON(info);
                var sourceLink = domain + res.key;
                //获取原图片基本信息
                var imageInfoObj = onlyQiniu.imageInfo(res.key);
                var htmlStr = '<div class="item">' + '<img class="itemimg" src="' + sourceLink + '" key="' + res.key + '" />' +
                    '<div><a class="butDel detele">删除</a></div>' + '</div>';
                $("#" + areaMore).append(htmlStr);
                if ($("#detailUrl").find("img").length == 1) {
                    //参数：七牛链接，图片key值，图片基本信息，比例，截图区域，图片存放区域
                    cutImage(domain, res.key, imageInfoObj, proportion, area, areafine);
                }
                $("#imgHidden").val(res.key);
                $("#detailUrl").undelegate(".detele", "click");
                $("#detailUrl").delegate(".detele", "click", function () {
                    $(this).parent().parent().remove();
                });
                $("#detailUrl").undelegate("img", "click");
                $("#detailUrl").delegate("img", "click", function () {
                    //参数：七牛链接，图片key值，图片基本信息，比例，截图区域，图片存放区域
                    cutImage(domain, $(this).attr("key"), imageInfoObj, proportion, area, areafine);
                });
                $("#onlyArea img").unbind("click");
                $("#onlyArea img").click(function () {
                    //参数：七牛链接，图片key值，图片基本信息，比例，截图区域，图片存放区域
                    cutImage(domain, $(this).attr("key"), imageInfoObj, proportion, area, areafine);
                });
            }
        }
    });

    if (datajson == null || datajson == "") {

    } else {
        for (var i = 0; i < datajson.length; i++) {
            var htmlstr = '<div class="item">' +
                    '<img class="itemimg" src="' + qiniudomain + datajson[i].PhotoUrl + '" key="' + datajson[i].PhotoUrl + '" />' +
                    '<div><a class="butDel detele">删除</a></div>' +
                    '</div>';
            $("#" + areaMore).append(htmlstr);
            $("#imgHidden").val(datajson[i].PhotoUrl);
        }

        //$("#" + area + " img").attr("src", qiniudomain + datajson);
        //$("#" + area + " img").attr("key", datajson);
    }

    //单图上传清空按钮

};



//截图方法
var cutImage = function (domain, oldkey, imageInfoObj, proportion, area, areafine) {
    var ratio = 0;//图片比例
    var startX = 0;//最终X轴坐标
    var startY = 0;//最终Y轴坐标
    var width = 0;//最终截取图片宽度
    var height = 0;//最终截取图片高度
    var sourceLink = domain + oldkey;
    var key = oldkey;
    //替换需要截图的图片
    $("#" + area + " img").attr("src", sourceLink);
    //加载截图插件
    $('#' + area + ' img').imgAreaSelect({
        aspectRatio: proportion,
        handles: true,
        fadeSpeed: 200,
        instance: true,
        onSelectEnd: function (img, selection) {
            key = oldkey;
            ratio = (imageInfoObj.width / 500);
            startX = (selection.x1 * ratio).toFixed(2);
            startY = (selection.y1 * ratio).toFixed(2);
            width = (selection.width * ratio).toFixed(2);
            height = (selection.height * ratio).toFixed(2);
            key += "?imageMogr2/crop/!" + width + "x" + height + "a" + startX + "a" + startY;
        }
    });
    //截图按钮
    $("#" + area + " a").unbind("click");
    $("#" + area + " a").click(function () {

        $("#" + areafine + " img").attr("src", domain + key);
        $("#" + areafine + " img").attr("key", key);
        $(".imgareaselect-outer").hide();
        $(".imgareaselect-outer").prev().hide();
        $('#' + area).fadeOut(300);
        $(".maskCut").hide();
    });
    //不保存截图事件
    $(".maskCut").unbind("click");
    $(".maskCut").click(function () {
        $(".maskCut").hide();
        $(".imgareaselect-outer").hide();
        $(".imgareaselect-outer").prev().hide();
        $('#' + area).fadeOut(300);
    });
    //截图页面显示
    $(".maskCut").show();
    $('#' + area).fadeIn(300);
}



//七牛封装多图
var initQiniuMuch = function (btn, area, datajson) {
    var muchQiniu = new QiniuJsSDK();
    var muchUploader = muchQiniu.uploader({
        runtimes: 'html5,flash,html4', //上传模式,依次退化
        browse_button: btn, //上传选择的点选按钮，**必需**
        uptoken_url: '/SiteAdmin/Qiniu/GetUptoken?bucket=' + qiniubucket,
        unique_names: true,
        domain: qiniudomain,
        max_file_size: '10mb', //最大文件体积限制
        flash_swf_url: '/Areas/SiteAdmin/Assets/Plugins/plupload/Moxie.swf', //引入flash,相对路径
        max_retries: 3, //上传失败最大重试次数
        dragdrop: true, //开启可拖曳上传
        drop_element: 'container', //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '1mb', //分块上传时，每片的体积
        auto_start: true, //选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
            'FileUploaded': function (up, file, info) {
                var domain = up.getOption('domain');
                var res = $.parseJSON(info);
                var sourceLink = domain + res.key;

                $('#' + area).prepend("<li class='item' key='" + res.key + "'>" +
                    "   <img src='" + sourceLink + "' />" +
                    "   <textarea placeholder='图片说明' rows='3' cols='21' class='inputTextArea'></textarea>" +
                    "   <input type='text' placeholder='图片链接' class='inputText' /><br />" +
                    "   <div> " +
                    "       <span class='butDel'>删除</span> " +
                    "   </div> " +
                    "</li>").sortable();
            }
        }
    });
    if (datajson != null) {
        $.each(datajson, function (i, m) {
            $('#' + area).append("<li class='item' key='" + m.Key + "' id='" + m.ID + "'>" +
                "   <img src='" + qiniudomain + m.Key + "' />" +
                "   <textarea placeholder='图片说明' rows='3' cols='21' class='ignore'>" + m.Summary + "</textarea>" +
                "   <input type='text' placeholder='图片链接' class='ignore' value='" + m.Link + "' /><br />" +
                "   <div> " +
                "       <span class='butDel'>删除</span> " +
                "   </div> " +
                "</li>").sortable();
        });
    }
    //七牛删除
    $('#' + area + ' .butDel').unbind("click");
    $('#' + area + ' .butDel').on("click", function () {
        $(this).parent().parent().remove();
    });
};


var SetImage = function (area, datajson) {
    if (datajson == null || datajson == "") {

    } else {
        for (var i = 0; i < datajson.length; i++) {
            var htmlstr = '<div class="item">' +
                    '<img class="itemimg" src="' + qiniudomain + datajson[i].PhotoUrl + '" key="' + datajson[i].PhotoUrl + '" />' +
                    '</div>';
            $("#" + area).append(htmlstr);
            //$("#imgHidden").val(datajson[i].PhotoUrl);
        }

    }
}