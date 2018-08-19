import _ from 'lodash';

export const isMobileViewport = () => {
    const isSafari = _.isUndefined(window.visualViewport);
    let viewport;

    if (isSafari) {
        viewport = window.innerWidth;
    } else {
        viewport = window.visualViewport.width;
    }

    return viewport <= 768;
};
