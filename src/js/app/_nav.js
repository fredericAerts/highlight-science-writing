hsr = hsr || {};

hsr.nav = ((window, undefined) => {

    let init;

    let addMobileMenuEvenListeners, addHeaderLogoEventListener, addPageNavEventListeners;

    let initPage;

    let bgMarkerElement = document.querySelector('.js-bg-marker');
    let mobileMenuElement = document.querySelector('.js-header__mobile-menu');
    let pageElements = [
        document.querySelector('.js-about-us'),
        document.querySelector('.js-our-services'),
        document.querySelector('.js-what-clients-say'),
        document.querySelector('.js-blog'),
        document.querySelector('.js-contact')
    ];
    let activePageIndex = -1; // landing page

    init = () => {
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
            mobileMenuElement.classList.remove('open');
            if (activePageIndex === -1) {return;} // already on landing page

            let currentPageElement = pageElements[activePageIndex];

            currentPageElement.classList.add('active--from-bottom');
            currentPageElement.classList.remove('positioned', 'active--from-right', 'active--from-left');
            setTimeout(function() {
                currentPageElement.classList.remove('active', 'active--from-bottom');
                bgMarkerElement.classList.add('landing-page');
            }, 100);

            mobileMenuElement.classList.remove('open');
            activePageIndex = -1;
        });
    }

    addPageNavEventListeners = () => {
        let headerButtonElementsArray = [].slice.call(document.querySelectorAll('.js-header__nav__link'));
        let heroButtonElementsArray = [].slice.call(document.querySelectorAll('.js-hero__buttons button'));
        let navButtonElementsArray = headerButtonElementsArray.concat(heroButtonElementsArray);
        navButtonElementsArray.forEach((button) => {
            button.addEventListener('click', (event) => {
                let targetIndex = parseInt(event.target.getAttribute('data-target-index'), 10);
                initPage(targetIndex);
                mobileMenuElement.classList.remove('open');
                event.preventDefault();
            });
        });
    }

    initPage = (pageIndex) => {
        if (pageIndex === activePageIndex) return; // page already active

        let currentPageElement = pageElements[activePageIndex];
        let targetPageElement = pageElements[pageIndex];

        if (activePageIndex < 0) { // current page is landing page => new page moves in from bottom
            targetPageElement.classList.add('active', 'active--from-bottom');
            bgMarkerElement.classList.remove('landing-page');
            setTimeout(function() {
                targetPageElement.classList.add('positioned');
            }, 700);
        }
        else if (pageIndex < activePageIndex) { // new page moves in from left
            currentPageElement.classList.add('active--from-right');
            currentPageElement.classList.remove('positioned', 'active--from-bottom', 'active--from-left');
            setTimeout(function() {
                currentPageElement.classList.remove('active', 'active--from-right');
                targetPageElement.classList.add('active', 'active--from-left');
                setTimeout(function() {
                    targetPageElement.classList.add('positioned');
                }, 100);
            }, 300);

        }
        else { // new page moves in from right
            currentPageElement.classList.add('active--from-left');
            currentPageElement.classList.remove('positioned', 'active--from-bottom', 'active--from-right');
            setTimeout(function() {
                currentPageElement.classList.remove('active', 'active--from-left');
                targetPageElement.classList.add('active', 'active--from-right');
                setTimeout(function() {
                    targetPageElement.classList.add('positioned');
                }, 100);
            }, 300);
        }
        activePageIndex = pageIndex;
    }

    return {
        init: init
    };

}(window));

