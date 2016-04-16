hsr = hsr || {};

hsr.nav = ((window, undefined) => {

    let init;

    let addMobileMenuEvenListeners, addHeaderLogoEventListener, addPageNavEventListeners;

    let initPage;

    let bgMarkerElement = document.querySelector('.js-bg-marker');
    let mobileMenuElement = document.querySelector('.js-header__mobile-menu');
    let pageElements = [
        document.querySelector('.js-what-we-do'),
        document.querySelector('.js-about-us'),
        document.querySelector('.js-what-clients-say'),
        document.querySelector('.js-blog'),
        document.querySelector('.js-contact')
    ];
    let activePageIndex = -1; // landing page

    // Cached DOM variables
    let bodyElement = document.querySelector('body');
    let headerButtonWrapperElement = document.querySelector('.js-nav-link-wrapper');
    let headerButtonElementsArray = [].slice.call(document.querySelectorAll('.js-header__nav__link'));

    init = () => {
        bodyElement.classList.add('on-landing-page');
        bodyElement.style.height = window.innerHeight + 'px';
        addMobileMenuEvenListeners();
        addHeaderLogoEventListener();
        addPageNavEventListeners();
    };

    addMobileMenuEvenListeners = () => {
        mobileMenuElement.addEventListener('click', () => {
            if (mobileMenuElement.classList.contains('open')) {
                mobileMenuElement.classList.remove('open');
            }
            else {
                mobileMenuElement.classList.add('open');
            }
        });
    }

    addHeaderLogoEventListener = () => {
        let headerLogoElement = document.querySelector('.js-header__logo');
        headerLogoElement.addEventListener('click', () => { // back to landing page
            initPage(-1);
        });
    }

    addPageNavEventListeners = () => {
        let heroButtonElementsArray = [].slice.call(document.querySelectorAll('.js-hero__buttons button')),
            pageNavLinks = [].slice.call(document.querySelectorAll('.js-nav-link'));
        let navButtonElementsArray = headerButtonElementsArray.concat(heroButtonElementsArray, pageNavLinks);
        navButtonElementsArray.forEach((button) => {
            button.addEventListener('click', (event) => {
                let targetIndex = parseInt(event.target.getAttribute('data-target-index'), 10);
                initPage(targetIndex);
            });
        });
    }

    initPage = (targetPageIndex) => { // navigate to landing page is handled by function addHeaderLogoEventListener
        mobileMenuElement.classList.remove('open');

        if (targetPageIndex === activePageIndex) {return;}

        let currentPageElement = pageElements[activePageIndex];
        let targetPageElement = pageElements[targetPageIndex];

        removeActiveClassFromNavlinks();

        if (targetPageIndex < 0) { // navigate back to landing page
            bodyElement.classList.add('on-landing-page');
            bodyElement.style.height = window.innerHeight + 'px';
            headerButtonWrapperElement.classList.remove('page-from-left', 'page-from-right');
            currentPageElement.classList.add('active--from-bottom');
            currentPageElement.classList.remove('positioned', 'active--from-right', 'active--from-left');
            setTimeout(function() {
                currentPageElement.classList.remove('active', 'active--from-bottom');
                bgMarkerElement.classList.add('landing-page');
            }, 100);

        }
        else if (activePageIndex < 0) { // current page is landing page => new page moves in from bottom
            removeActiveClassFromNavlinks();

            targetPageElement.classList.add('active', 'active--from-bottom');
            bgMarkerElement.classList.remove('landing-page');
            setTimeout(function() {
                targetPageElement.classList.add('positioned');
                addActiveClassToNavlink();
                bodyElement.classList.remove('on-landing-page');
                bodyElement.style.height = 'auto';
            }, 300);
        }
        else if (targetPageIndex < activePageIndex) { // new page moves in from left
            headerButtonWrapperElement.classList.remove('page-from-left');
            headerButtonWrapperElement.classList.add('page-from-right');
            removeActiveClassFromNavlinks();

            currentPageElement.classList.add('active--from-right');
            currentPageElement.classList.remove('positioned', 'active--from-bottom', 'active--from-left');
            setTimeout(function() {
                currentPageElement.classList.remove('active', 'active--from-right');
                targetPageElement.classList.add('active', 'active--from-left');
                setTimeout(function() {
                    targetPageElement.classList.add('positioned');
                    addActiveClassToNavlink();
                }, 100);
            }, 300);

        }
        else { // new page moves in from right
            headerButtonWrapperElement.classList.remove('page-from-right');
            headerButtonWrapperElement.classList.add('page-from-left');
            removeActiveClassFromNavlinks();

            currentPageElement.classList.add('active--from-left');
            currentPageElement.classList.remove('positioned', 'active--from-bottom', 'active--from-right');
            setTimeout(function() {
                currentPageElement.classList.remove('active', 'active--from-left');
                targetPageElement.classList.add('active', 'active--from-right');
                setTimeout(function() {
                    targetPageElement.classList.add('positioned');
                    addActiveClassToNavlink();
                }, 100);
            }, 300);
        }

        activePageIndex = targetPageIndex;

        function removeActiveClassFromNavlinks() {
            headerButtonElementsArray.forEach(function(button) {
                button.classList.remove('active');
            });
        }

        function addActiveClassToNavlink() {
            headerButtonElementsArray.filter(function(button) {
                return parseInt(button.getAttribute('data-target-index'), 10) === targetPageIndex;
            })[0].classList.add('active');
        }
    }

    return {
        init: init
    };

}(window));

