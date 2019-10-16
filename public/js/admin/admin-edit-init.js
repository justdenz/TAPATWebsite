$("#editForm").submit(function (e) {
    e.preventDefault();

    var title = $("#titleInput").val()
    var briefInfo = $("#briefInput").val()
    var id = $("#editForm").attr("data-id")

    $.ajax({
        url: "/admin/edit_init_submit",
        method: "GET",
        data: {
            title,
            briefInfo,
            id
        },
        success: function (result) {
            if (result == '1') {
                window.location = "/admin/initiatives"
            }
            else {
                alertify.error(result)
            }
        }

    })

})

$("#deleteBtn").click(function () {
    alertify.confirm("Are you sure you want to delete initiative?",
        function () {
            var id = $("#editForm").attr("data-id")

            $.ajax({
                url: "/admin/delete_init_submit",
                method: "GET",
                data: {
                    id: id
                },
                success: function (result) {
                    if (result == '1') {
                        window.location = "/admin/initiatives"
                    }
                    else {
                        alertify.error(result)
                    }
                }

            })

        },
        function () {

        });
})