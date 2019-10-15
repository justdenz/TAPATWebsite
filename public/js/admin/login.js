$(document).ready(() => {

    $("#loginForm").submit(function (e) {
        e.preventDefault()


        alertify.set('notifier', 'position', 'bottom-left');

        if ($("#inputUsername").val().toLowerCase() === '') {

            alertify.error('Username cannot be empty');
        } else {
            $.ajax({
                url: "/admin/verify_user",
                method: "POST",
                data: {
                    username: $("#inputUsername").val(),
                    password: $("#inputPassword").val()
                },
                success: function (result) {
                    if (result == '1') {
                        window.location = "/admin/"
                    } else if (result == "0") {
                        alertify.error('Password is incorrect');
                    }

                },
            })
        }

    })
})