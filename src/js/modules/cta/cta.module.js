/*  Constants
    ================================================================ */
const ctaEl = document.querySelector('.js-cta');

/*  Exports
    ================================================================ */
function ctaModuleInit() {
  if (!ctaEl) {
    return;
  }

  ctaEl.addEventListener('click', () => {
    window.scrollTo({ 
      top: document.body.scrollHeight,
      behavior: 'smooth' 
    });
  });
}

export {
  ctaModuleInit,
}
    