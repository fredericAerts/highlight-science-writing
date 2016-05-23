hsrBlog = hsrBlog || {};

hsrBlog.datepicker = (function(window, undefined) {

    var init;


    init = () => {
        $( "#datepicker" ).datepicker($.datepicker.regional[ "nl-BE" ]);
    };

    return {
        init: init
    };

}(window));

