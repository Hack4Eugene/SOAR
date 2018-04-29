import _ from 'lodash';
import moment from 'moment';

export const STORAGE_KEY = `ecan_${ENVIRONMENT}`;

export default function myReducerMiddleware(config) {
    const mergeState = (initialState, persistedState) => (
        persistedState
            ? { ...initialState, ...persistedState }
            : initialState
    );

    return next => (reducer, initialState, enhancer) => {
        if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
            enhancer = initialState;
            initialState = undefined;
        }

        let persistedState;
        let finalInitialState;

        try {
            persistedState = JSON.parse(localStorage.getItem(STORAGE_KEY));
            finalInitialState = mergeState(initialState, { authentication: persistedState });
        } catch (e) {
            console.warn('Failed to retrieve initialize state from localStorage:', e);
        }

        const store = next(reducer, finalInitialState, enhancer);

        store.subscribe(_.throttle(() => {
                const state = store.getState();
                const user = _.get(state, 'user', {});
                const auth = _.get(state, 'authentication', {});

                if (_.isEmpty(user)) {
                    return;
                }

                const isLoggedIn = _.get(state, 'authentication.isLoggedIn', false);
                const isTokenExpired = _.get(state, 'authentication.isTokenExpired', true);

                console.log({ isLoggedIn, isTokenExpired });

                const storage = _.reduce({ ...user, ...auth }, (storageObj, value, key) => {
                    if (!isLoggedIn) {
                        console.log('logged out');
                        if (key === 'isLoggedIn' || key === 'isTokenExpired') {
                            storageObj.authentication[key] = value
                            return storageObj;
                        }
                    } else {
                        console.log('logged in');
                        storageObj = {
                            user: {
                                ...user
                            },
                            authentication: {
                                ...auth,
                                isTokenExpired,
                                isLoggedIn
                            }
                        };
                    }
                    return storageObj;
                }, { user: {}, authentication: {} });

                try {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
                } catch (e) {
                    console.warn('Unable to persist state to localStorage:', e);
                }
            })
        );

        return store;
    };
};

export const persistedState = initialState => {
    const persistedState = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (persistedState) {
        const expirationDate = _.get(persistedState, 'authentication.expiresAt', null);

        const isTokenExpired = moment.utc().isAfter(moment.utc(expirationDate));

        if (isTokenExpired) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ })) // null out local storage
        }

        if (!isTokenExpired) {
            return _.assign(initialState, {
                authentication: persistedState.auth,
                user: persistedState.user
            });
        }
    }

    return initialState
};