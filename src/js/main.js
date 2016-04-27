'use strict';
let hsr = hsr || {};

hsr.app = ((window, undefined) => {

    // On Dom ready
    let init = () => {
        hsr.nav.init();
        hsr.contactForm.init();
        hsr.blog.init();
        hsr.flipside.init();
        attachWindowEventHandlers();
    };


    // On All loaded
    // initOnload = () => {
    //     appScroll();
    // };

    function attachWindowEventHandlers() {
        window.addEventListener('click', function clickEventHandler(event) {
            hsr.flipside.closeTiles();
        });
    }

    // On Scroll
    // appScroll = () => {
    //     let _onScroll;

    //     _onScroll = debounce(() => {
    //         console.log('scrolling');
    //     }, 50);

    //     $(window).scroll(() =>{
    //         _onScroll();
    //     });
    // };

    // debounce = (func, wait, immediate) => {
    //     let timeout;
    //     return (...args) => {
    //         let context = this;
    //         let later = () => {
    //             timeout = null;
    //             if (!immediate) {
    //                 func.apply(context, args);
    //             }
    //         };
    //         let callNow = immediate && !timeout;
    //         clearTimeout(timeout);
    //         timeout = setTimeout(later, wait);
    //         if (callNow) {
    //             func.apply(context, args);
    //         }
    //     };
    // };

    return {
        init: init
        // initOnload: initOnload
    };

}(window));


// Dom ready
document.addEventListener('DOMContentLoaded', () => {
 hsr.app.init();
}, false);

// All loaded
// $(window).load(() => {
//     hsr.app.initOnload();
// });
