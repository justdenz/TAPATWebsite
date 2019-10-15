$(document).ready(() => {

    $("#updatePasswordForm").submit(function (e) {
        e.preventDefault()

        $.ajax({
            url: "/admin/verify_password",
            method: "POST",
            data: {
                current_password: $('#currentInput').val(),
                new_password: $('#newInput').val(),
                confirm_new_pass: $('#confirmInput').val()
            }
        }, {
            success: function(result){
                if(result == '1'){
                    console.log("ajax for change password!")
                }
            }
        })
    })
})