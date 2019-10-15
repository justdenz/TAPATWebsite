$("#newForm").submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    
    $.ajax({
        url: "/admin/add_init",
        method: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function(r){
            if(r == 1){
                window.location = "/admin/initiatives"
            }
        },
        error: function (e) {
            alertify.error(e)
        }
    })
})