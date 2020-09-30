/*  Constants
    ================================================================ */
    const bodyEl = document.querySelector('body');

    /*  Exports
        ================================================================ */
    function exampleModuleInit() {
      if (!bodyEl) {
        return;
      }

      console.log('hello example module');
    }
    
    export {
      exampleModuleInit,
    }
    