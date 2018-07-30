export const storeUserSession = (payload, getState) => {
    const env = _.get(getState, 'env', 'local');
    const record = JSON.stringify(payload);
    localStorage.setItem(`ecan_${env}`, JSON.stringify(record));
};

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