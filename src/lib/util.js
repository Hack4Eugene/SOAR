import { get, isEqual, reduce } from 'lodash';

export const isMobileViewport = () => {
    const viewport = window.screen.width;

    return viewport <= 768 || window.innerWidth <= 768;
};

//Shallow diff
export const diffBetween = (oldRecord, newRecord) => (
    reduce(newRecord, (uniqUpdates, val, i) => {
        if (!isEqual(oldRecord[i], val)) {
            uniqUpdates[i] = val;
        }

        return uniqUpdates;
    }, {})
);

export const stripAxiosRequestFromError = (errorPayload) => {
    const getErrorPayloadField = path => get(errorPayload, path, null);
    const res = getErrorPayloadField('response');
    const message = getErrorPayloadField('response.data.message');
    const code = getErrorPayloadField('response.status');
    const defaultError = getErrorPayloadField('response.data');
    const axiosReqConfig = { headers: getErrorPayloadField('response.headers'), config: getErrorPayloadField('response.config') };

    return {
        message,
        code,
        defaultError,
        axiosReqConfig,
        res
    };
};
