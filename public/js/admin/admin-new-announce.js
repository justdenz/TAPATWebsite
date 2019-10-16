var toolbarOptions = [
    [{ 'font': [] }], //font to be used
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    ['link', 'image', 'video'],
    [{ 'align': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    ['formula', { 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'direction': 'rtl' }],
    ['clean']
];

var options = {
    theme: 'snow',
    modules: {
        toolbar: toolbarOptions,
        formula: true          // Include formula module (needs extra css + Katex Script)
    },
    placeholder: 'Write here...',
}

var container = document.getElementById('editor-container');
var editor = new Quill(container, options);
var content = editor.getContents();
content = JSON.stringify(content)

$("#newForm").submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    formData.set('content', content)
    
    $.ajax({
        url: "/admin/add_announce",
        method: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function(r){
            if(r == 1){
                window.location = "/admin/announcements"
            }
        },
        error: function (e) {
            alertify.error(e)
        }
    })
})