$(document).ready(function () {

    $("a.editBtn").click(function () {
        $("#editid").val($(this).attr("data-id"))
        $("#editform").submit()
    })

})