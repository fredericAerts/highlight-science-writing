import { exampleModuleInit } from './modules/example/example.module';

import '../css/index.styl';
import '../views/index.styl';

function init() {
  exampleModuleInit();
}

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}

