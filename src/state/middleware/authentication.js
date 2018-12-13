import _ from 'lodash';
import { isValidToken } from '../../lib/common';

export const STORAGE_KEY = `ecan_${window.ENVIRONMENT}`;
export const NULL_USER = { };
export const NULL_SESSION = { isTokenExpired: true, isLoggedIn: false };

export const validation = state => {
    if (!state) {
        return {
            user: {},
            authentication: { isTokenExpired: true }
        };
    }

    const user = _.get(state, 'user', NULL_USER);
    const authentication = _.get(state, 'authentication', {});
    const isLoggedIn = _.get(authentication, 'isLoggedIn', false);
    const isTokenExpired = _.get(authentication, 'isTokenExpired', true);

    return {
        user,
        authentication: {
            ...authentication,
            isLoggedIn,
            isTokenExpired
        }
    };
};

export default function persistLoggedInStateMiddleware(config) {
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
        let persistedValidation;

        try {
            persistedState = JSON.parse(localStorage.getItem(STORAGE_KEY));
            persistedValidation = validation(persistedState);
            finalInitialState = mergeState(initialState, { ...persistedState, ...persistedValidation });
        } catch (e) {
            console.warn('Failed to retrieve persisted state from localStorage:', e);
        }

        const store = next(reducer, finalInitialState, enhancer);

        store.subscribe(_.throttle(() => {
            const state = store.getState();
            const user = _.get(state, 'user', NULL_USER);
            const authentication = _.get(state, 'authentication', NULL_SESSION);

            if (_.isEmpty(user)) {
                return;
            }

            const isLoggedIn = authentication.isLoggedIn && isValidToken(state);

            const storage = isLoggedIn
                ? { user, authentication }
                : { user: NULL_USER, authentication: NULL_SESSION };

            if (isLoggedIn === false) {
                state.authentication = storage.authentication;
                state.user = storage.user;
            }

            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
            } catch (e) {
                console.warn('Unable to persist state to localStorage:', e);
            }
        }));

        return store;
    };
}

export const persistState = initialState => {
    const persistedState = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const user = _.get(persistedState, 'user', {});
    const authentication = _.get(persistedState, 'authentication', NULL_SESSION);
    const persistedValidation = validation(initialState);

    return _.assign({}, {
        ...initialState,
        user,
        authentication,
        ...persistedValidation
    });
};
