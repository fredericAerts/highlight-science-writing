'use strict';
var hsrBlog = hsrBlog || {};

hsrBlog.app = (function(window, undefined) {

    // On Dom ready
    var init = () => {
        hsrBlog.tinymce.init();
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


