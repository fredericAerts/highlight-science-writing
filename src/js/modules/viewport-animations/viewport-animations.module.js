import inViewport from 'in-viewport';

/*  Constants
    ================================================================ */
const animatedEls = document.querySelectorAll('.js-page-section-content');
const inViewportOptions = {};

/*  Exports
    ================================================================ */
function viewportAnimationsModuleInit() {
  animatedEls.forEach((el) => {
    inViewport(el, inViewportOptions, () => visible(el));
  });
}

/*  Helpers
    ================================================================ */
function visible(el) {
  el.parentNode.classList.add('active');
}

export {
  viewportAnimationsModuleInit,
}
    