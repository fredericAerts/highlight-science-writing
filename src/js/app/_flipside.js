hsr = hsr || {};

hsr.flipside = ((window, undefined) => {

    let init, closeTiles;

    let addEventListeners;

    // DOM variable
    let ourServicesPage = document.querySelector('.js-our-services');
    let flipsideTileElements = [].slice.call(document.querySelectorAll('.flipside'));

    init = () => {
        addEventListeners();
    };

    addEventListeners = () => {
        flipsideTileElements.forEach(function(tile) {
            let tileFront = tile.querySelector('.flipside__front'),
            btnClose = tile.querySelector('.js-close-flip');

            tileFront.addEventListener( 'click', function(event) {
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
                ourServicesPage.classList.add('tile-open');
                event.stopPropagation();
            });

             btnClose.addEventListener('click', function(event) {
                flipsideTileElements.forEach(function(tile) {
                    tile.classList.remove('blurred');
                });
                tile.classList.remove('is-open');
                ourServicesPage.classList.remove('tile-open');
                event.stopPropagation();
            });
        });
    }

    closeTiles = () => {
        flipsideTileElements.forEach(function(tile) {
            tile.classList.remove('blurred');
            tile.classList.remove('is-open');
            ourServicesPage.classList.remove('tile-open');
        });
    }

    return {
        init: init,
        closeTiles: closeTiles
    };

}(window));
