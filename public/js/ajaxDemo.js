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