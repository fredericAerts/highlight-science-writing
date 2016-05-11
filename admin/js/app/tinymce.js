hsrBlog = hsrBlog || {};

hsrBlog.tinymce = (function(window, undefined) {

    var init;


    init = () => {
        tinymce.init({
            selector: 'textarea',
            height: 500,
            plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table contextmenu paste code'
            ],
            toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            content_css: [
            '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
            '//www.tinymce.com/css/codepen.min.css'
            ]
        });


        $('.editor-submit').click(function() {
            // get editor content as HTML
            console.debug(tinyMCE.activeEditor.getContent());
        });

        $('.editor-convert').click(function() {
            // convert HTML to sync with Editor (for making update to existing HTML post)
            tinyMCE.activeEditor.setContent(tinyMCE.activeEditor.getContent({format:'text'}));
        });
    };

    return {
        init: init
    };

}(window));

