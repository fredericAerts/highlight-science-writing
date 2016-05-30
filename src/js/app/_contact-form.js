hsr = hsr || {};

hsr.contactForm = ((window, undefined) => {

    let init, addEventListeners;

    let urlPrefix = 'http://66.147.244.112/~highlii7/';
    // let urlPrefix = 'http://localhost:8888/';

    let contactForm = document.querySelector('.contact-form'),
    inputFieldElements = [].slice.call(document.querySelectorAll('.contact-form .input__field')),
    inputHoneypotField = document.querySelector('.contact-form #input-honeypot'),
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
            submitButton.removeEventListener('click', onFormSubmit);
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
                let url = urlPrefix + 'backend/contact.php';
                // let url = 'http://localhost:8888/backend/contact.php';
                postAjax(url, serialize(inputFieldElements.concat(inputHoneypotField)), function(data){
                    if (data === 'nok') {
                        let feedbackTitleElement = document.querySelector('.contact-form__thank-you__title');
                        let feedbackTextElement = document.querySelector('.contact-form__thank-you__text');
                        feedbackTitleElement.textContent = 'Oops.'
                        feedbackTextElement.innerHTML = 'Something went wrong. Please contact us directly via <a href="mailto:info@highlight-science-writing.com" target="_top">info@highlight-science-writing.com</a>'
                    }
                    contactForm.classList.add('sent');
                });
            }
            else {
                submitButton.addEventListener('click', onFormSubmit);
            }

            event.preventDefault();
        }

        function validateEmail(email) {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return !re.test(email);
        }

        function serialize(inputFields) {
            let s = [];
            inputFields.forEach((field) => {
                if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
                    if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                        s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
                    }
                }
            });
            return s.join('&').replace(/%20/g, '+');
        }

        function postAjax(url, data, success) {
            var params = typeof data == 'string' ? data : Object.keys(data).map(
                    function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
                ).join('&');

            var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
            xhr.open('POST', url);
            xhr.onreadystatechange = function() {
                if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
            };
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(params);
            return xhr;
        }
    }

    return {
        init: init
    };

}(window));
