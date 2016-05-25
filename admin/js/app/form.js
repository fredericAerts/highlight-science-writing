hsrBlog = hsrBlog || {};

hsrBlog.form = (function(window, undefined) {

    var init;

    init = () => {

        $('.editor-submit').click(function() {
            var formData = {
                folder: $("#folder").val(),
                title: $("#title").val(),
                date: $("#datepicker").val(),
                description: $("#description").val(),
                bodyHtml: tinyMCE.activeEditor.getContent()
            }

            $.post("backend/process-form.php", formData, function(data, status) {
                console.log(data);
            });
        });

        // $('.editor-convert').click(function() {
        //     tinyMCE.activeEditor.setContent(tinyMCE.activeEditor.getContent({format:'text'}));
        // });
    };

    return {
        init: init
    };

}(window));

