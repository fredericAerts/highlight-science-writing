hsr = hsr || {};

hsr.contactForm = ((window, undefined) => {

    let init, addEventListeners;

    let contactForm = document.querySelector('.contact-form'),
    inputFieldElements = [].slice.call(document.querySelectorAll('.contact-form .input__field')),
    inputNameField = document.querySelector('.contact-form #input-name'),
    inputEmailField = document.querySelector('.contact-form #input-email'),
    inputMessageField = document.querySelector('.contact-form #input-message'),
    submitButton = document.querySelector('.contact-form .js-submit-contact-form');

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

        submitButton.addEventListener('click', onFormSubmit);

        // HANDLERS
        function onInputFocus(event) {
            event.target.parentNode.classList.add('js-input-filled');
            event.target.parentNode.classList.remove('js-empty');
            event.target.parentNode.classList.remove('js-invalid');
        }

        function onInputBlur(event) {
            if (event.target.value.trim() === '') {
                event.target.parentNode.classList.remove('js-input-filled');
            }
        }

        function onFormSubmit(event) {
            let isNameEmpty = inputNameField.value.trim() === '',
            isEmailEmpty = inputEmailField.value.trim() === '',
            isEmailInvalid = validateEmail(inputEmailField.value.trim()),
            isMessageEmpty = inputMessageField.value.trim() === '';

            inputNameField.parentNode.classList.remove('js-empty');
            inputEmailField.parentNode.classList.remove('js-empty');
            inputEmailField.parentNode.classList.remove('js-invalid');
            inputMessageField.parentNode.classList.remove('js-empty');

            // handle error message Name
            if (isNameEmpty) {
                inputNameField.parentNode.classList.add('js-empty');
            }

            // handle error message Email
            if (isEmailEmpty) {
                inputEmailField.parentNode.classList.add('js-empty');
            }
            else if (isEmailInvalid) {
                inputEmailField.parentNode.classList.add('js-invalid');
            }

            // handle error message Message
            if (isMessageEmpty) {
                inputMessageField.parentNode.classList.add('js-empty');
            }

            if (!isNameEmpty && !isEmailEmpty && !isEmailInvalid && !isMessageEmpty) {
                contactForm.classList.add('sent');
            }

            event.preventDefault();
        }

        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return !re.test(email);
        }
    }

    return {
        init: init
    };

}(window));
