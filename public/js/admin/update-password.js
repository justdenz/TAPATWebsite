$(document).ready(() => {

    $("#updatePasswordForm").submit(function (e) {
        e.preventDefault()
        alertify.set('notifier', 'position', 'bottom');

        $.ajax({
            url: "/admin/change_password_submit",
            method: "POST",
            data: {
                current_password: $('#currentInput').val(),
                new_password: $('#newInput').val(),
                confirm_new_pass: $('#confirmInput').val()
            },
            success: function (result) {
                if (result == '1') {
                    alertify.success("Password has been changed")
                    $("#currentInput").val("")
                    $("#newInput").val("")
                    $("#confirmInput").val("")
                } else if (result == 'error') {
                    alertify.error("An error has ocurred please try again...")
                } else if (result == 'unmatch_password') {
                    alertify.error("New passwords does not match!")
                } else if (result == 'incomplete_requirements') {
                    alertify.error("Please fill out all requirements...")
                } else if (result == '0') {
                    alertify.error('Incorrect password!')
                }
            }
        })
    })
})