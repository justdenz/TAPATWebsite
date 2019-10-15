$("#editForm").submit(function (e) {
    e.preventDefault();

    var title = $("#titleInput").val()
    var briefInfo = $("#briefInput").val()
    var content = editor.getContents();
    var id = $("#editForm").attr("data-id")

    content = JSON.stringify(content)

    $.ajax({
        url: "/admin/edit_announce_submit",
        method: "GET",
        data: {
            title,
            briefInfo,
            content,
            id
        },
        success: function (result) {
            if (result == '1') {
                window.location = "/admin/announcements"
            }
            else {
                alertify.error(result)
            }
        }

    })

})

$("#deleteBtn").click(function () {
    alertify.confirm("Are you sure you want to delete announcement?",
        function () {
            var id = $("#editForm").attr("data-id")

            $.ajax({
                url: "/admin/delete_announce_submit",
                method: "GET",
                data: {
                    id: id
                },
                success: function (result) {
                    if (result == '1') {
                        window.location = "/admin/announcements"
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