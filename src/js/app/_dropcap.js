hsr = hsr || {};

hsr.dropcap = ((window, undefined) => {

    let init;

    init = () => {
        let dropcaps = document.querySelectorAll(".dropcap");
        window.Dropcap.layout(dropcaps, 3);
    };

    return {
        init: init
    };

}(window));

