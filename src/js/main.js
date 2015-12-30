'use strict';
var hsr = hsr || {};

hsr.app = ((window, undefined) => {
    
    // On Dom ready
    let init = () => {
        setTimeout(function() {
            document.querySelector('body').classList.remove('hidden');
            document.querySelector('.content__logo').classList.add('highlighted');
        }, 300);
    };


    // On All loaded
    // initOnload = () => {
    //     appScroll();
    // };

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