const STORAGE_KEY = `ecan_${ENVIRONMENT}`;

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
                const user = _.get(state, 'user.data', {});

                if (_.isEmpty(user)) {
                    return;
                }

                try {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
                } catch (e) {
                    console.warn('Unable to persist state to localStorage:', e);
                }
            })
        );

        return store;
    };
};