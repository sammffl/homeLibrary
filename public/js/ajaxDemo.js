$(function () {
    $("#btn").click(function () {
        $.ajax({
            url: "http://localhost:8801/api/v1/getText",
            method: "GET",
            dataType: "json",
            context: $("#btn"),
            success: function (data) {
                if (data) {
                    $("#txt").val(data.txt);
                }
            }
        }).done(function () {
            $(this).html("ajax called")
        });
    })
});



    jQuery.fn.autoscroll = function (selector) {

        $('html,body').animate({scrollTop: $(this).offset().top}, 500);
    };

    //然后像这样来滚动到你希望去到的class/area上。



       $(function () {
           $("").autoscroll();
       })

