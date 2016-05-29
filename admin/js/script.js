'use strict';
var hsrBlog = hsrBlog || {};

hsrBlog.app = (function(window, undefined) {

    // On Dom ready
    var init = function() {
        hsrBlog.tinymce.init();
        hsrBlog.datepicker.init();
        hsrBlog.form.init();
    };

    return {
        init: init
        // initOnload: initOnload
    };

}(window));


// Dom ready
document.addEventListener('DOMContentLoaded', () => {
  hsrBlog.app.init();
}, false);

// All loaded
// $(window).load(() => {
//     hsr.app.initOnload();
// });


