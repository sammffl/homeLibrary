/**
 * Created by SamMFFL on 2016/4/9.
 */

$(function () {
    $("#search-menu >li >a").click(function () {
        var originText = $("#search-btn .text").html();
        var originType = $("#search-btn").data("type");
        var currentText = $(this).html();
        var currentType = $(this).data("type");
        $("#search-btn .text").html(currentText);
        $("#search-btn ").data("type", currentType);
        $(this).html(originText);
        $(this).data("type", originType);
    });
    $("#search-text").keyup(function () {
        console.log($("#search-btn").data("type"))
    })
});