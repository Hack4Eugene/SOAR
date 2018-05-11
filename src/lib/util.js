export const storeUserSession = (payload, getState) => {
    const env = _.get(getState, 'env', 'local');
    const record = JSON.stringify(payload);
    localStorage.setItem(`ecan_${env}`, JSON.stringify(record));
};