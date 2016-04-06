hsr = hsr || {};

hsr.forms = ((window, undefined) => {

    let init, addEventListeners;

    let inputFieldElements = [].slice.call(document.querySelectorAll( 'input.input__field' ));

    init = () => {
        addEventListeners();
    };

    addEventListeners = () => {
        inputFieldElements.forEach(function(inputField) {
            // in case the input is already filled..
            if (inputField.value.trim() !== '') {
                inputField.parentNode.classList.add('js-input-filled');
            }
            inputField.addEventListener('focus', onInputFocus);
            inputField.addEventListener('blur', onInputBlur);
        });

        function onInputFocus(event) {
            event.target.parentNode.classList.add('js-input-filled');
        }

        function onInputBlur(event) {
            if (event.target.value.trim() === '') {
                event.target.parentNode.classList.remove('js-input-filled');
            }
        }
    }

    return {
        init: init
    };

}(window));
