hsr = hsr || {};

hsr.flipside = ((window, undefined) => {

    let init, closeTiles;

    let addEventListeners;

    // DOM variable
    let whatWeDoPage = document.querySelector('.js-services');
    let flipsideTileElements = [].slice.call(document.querySelectorAll('.flipside'));

    init = () => {
        addEventListeners();
    };

    addEventListeners = () => {
        flipsideTileElements.forEach(function(tile) {
            let tileFront = tile.querySelector('.flipside__front'),
            btnClose = tile.querySelector('.js-close-flip'),
            tileContent = tile.querySelector('.flipside__back__content');

            tileFront.addEventListener( 'click', function(event) {
                let windowWidth = window.innerWidth;

                let isAnotherTileOpened = flipsideTileElements.filter(function(tile) {
                    return tile.classList.contains('is-open');
                })[0];

                if (isAnotherTileOpened) {
                    return;
                }
                flipsideTileElements.forEach(function(tile) {
                    tile.classList.add('blurred');
                });
                tile.classList.remove('blurred');
                tile.classList.add('is-open');
                if (windowWidth < 768) {
                    tile.style.width = windowWidth - 30 + 'px';
                    tileContent.style.width = windowWidth - 80 + 'px';
                }
                else {
                   tile.removeAttribute('style');
                   tileContent.removeAttribute('style');
                }
                whatWeDoPage.classList.add('tile-open');
                event.stopPropagation();
            });

             btnClose.addEventListener('click', function(event) {
                flipsideTileElements.forEach(function(tile) {
                    tile.classList.remove('blurred');
                });
                tile.classList.remove('is-open');
                tile.removeAttribute('style');
                tileContent.removeAttribute('style');
                whatWeDoPage.classList.remove('tile-open');
                event.stopPropagation();
            });
        });
    }

    closeTiles = () => {
        flipsideTileElements.forEach(function(tile) {
            let tileContent = tile.querySelector('.flipside__back__content');
            tile.classList.remove('blurred');
            tile.classList.remove('is-open');
            tile.removeAttribute('style');
            tileContent.removeAttribute('style');
            whatWeDoPage.classList.remove('tile-open');
        });
    }

    return {
        init: init,
        closeTiles: closeTiles
    };

}(window));
