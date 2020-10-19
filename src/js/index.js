import './index.polyfills'

import { ctaModuleInit } from './modules/cta/cta.module';

import '../css/index.styl';
import '../views/index.styl';

function init() {
  ctaModuleInit();
}

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}

