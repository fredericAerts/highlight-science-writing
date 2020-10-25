import './index.polyfills'

import { ctaModuleInit } from './modules/cta/cta.module';
import { viewportAnimationsModuleInit } from './modules/viewport-animations/viewport-animations.module';

import '../css/index.styl';
import '../views/index.styl';

function init() {
  ctaModuleInit();
  viewportAnimationsModuleInit();
}

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}

