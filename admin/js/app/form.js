hsrBlog = hsrBlog || {};

hsrBlog.form = (function(window, undefined) {

    var init, populateBlogPostsTable;

    var urlPrefix = 'http://66.147.244.54/~stupidw2/projects/highlight/admin/';

    init = function() {

        $('.editor-submit').click(function() {
            var formData = {
                folder: $("#folder").val(),
                title: $("#title").val(),
                date: $("#datepicker").val(),
                description: $("#description").val(),
                bodyHtml: tinyMCE.activeEditor.getContent()
            }

            $.post("backend/process-form.php", formData, function(data, status) {
                // console.log(data);
            });
        });

        $('.editor-clear').click(function() {
            $("#folder").val("");
            $("#title").val("");
            $("#datepicker").val("");
            $("#description").val("");
            tinyMCE.activeEditor.setContent("");
        });

        // $('.editor-convert').click(function() {
        //     tinyMCE.activeEditor.setContent(tinyMCE.activeEditor.getContent({format:'text'}));
        // });

        $('.js-modal-blog-posts').on('show.bs.modal', function (e) {
            populateBlogPostsTable();
        });


    };

    populateBlogPostsTable = function() {
        $('.modal-body .table').html("");

        $.get(urlPrefix + "backend/handler.php?property=meta", function(data) {
            var metaData = JSON.parse(data);
            var metaDataArray = [];
            // convert data to Array of objects
            Object.keys(metaData).forEach(function(key) {
                metaDataArray.push(metaData[key + '']);
            });
            metaDataArray.forEach(function(post) {
                var tableRow = $("<tr><td>" + post.title + "</td></tr>");
                tableRow.click(function() {
                    $.get(urlPrefix + "backend/handler.php?property=body&folder=" + post.folder, function(bodyHtml) {
                        tinyMCE.activeEditor.setContent(bodyHtml);
                        $('.js-modal-blog-posts').modal('hide');
                        $('.js-input-folder').val(post.folder);
                        $('.js-input-date').val(post.date);
                        $('.js-input-title').val(post.title);
                        $('.js-input-description').val(post.description);
                    });
                });
                $('.modal-body .table').append(tableRow);
            });
        });
    }

    return {
        init: init
    };

}(window));

