hsrBlog = hsrBlog || {};

hsrBlog.datepicker = (function(window, undefined) {

    var init;


    init = function() {
        $( "#datepicker" ).datepicker($.datepicker.regional[ "nl-BE" ]);
    };

    return {
        init: init
    };

}(window));

