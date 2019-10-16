$(document).ready(function () {

    $("button.editBtn").click(function () {
        $("#editid").val($(this).attr("data-id"))
        $("#editform").submit()
    })

})