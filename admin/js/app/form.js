hsrBlog = hsrBlog || {};

hsrBlog.form = (function(window, undefined) {

    var init, populateBlogPostsTable;


    // let urlPrefix = 'http://localhost:8888/blog/';
    // var urlPrefix = 'http://66.147.244.54/~stupidw2/blog/';
    let urlPrefix = 'http://www.highlight-science-writing.com/blog/';

    init = function() {

        $('.editor-submit').click(function() {
            var formData = {
                folder: $("#folder").val(),
                title: $("#title").val(),
                date: $("#datepicker").val(),
                description: $("#description").val(),
                bodyHtml: tinyMCE.activeEditor.getContent()
            }

            $.post(urlPrefix + "backend/process-form.php", formData, function(data, status) {
                $('.js-modal-blog-posts-confirm .modal-body').html('<p>' + data + '</p>')
                $('.js-modal-blog-posts-confirm').modal({});
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

