import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createBrowserHistory from 'history/createBrowserHistory';
import _ from 'lodash';
import moment from 'moment';

import reducer from './state/reducers/index';

import App from './app';

const history = createBrowserHistory();

const initialState = { env: ENVIRONMENT || 'local' };

const getFinalInitialState = initialState => {
    console.log(`get ecan`);
    const persistedState = JSON.parse(localStorage.getItem(`ecan_${ENVIRONMENT}`));
    const expirationDate = persistedState.user.data.auth.expiresAt;
    console.log(expirationDate);
    const isExpired = moment(expirationDate).isBefore(moment.utc())
    if (isExpired) {
        console.log('expired');
        localStorage.setItem(`ecan_${ENVIRONMENT}.user.data.auth.expired`, true)
    }
    if (persistedState && !isExpired) {
        const newState = _.assign(initialState, persistedState);
        console.log({ newState });
        return newState;
    }
    return initialState
};

const middleware = applyMiddleware(thunk);
const enhancer = compose(middleware);

const store = createStore(
    reducer,
    getFinalInitialState(initialState),
    process.env.NODE_ENV === 'production'
        ? enhancer
        : composeWithDevTools({ name: 'Emerald Compassionate Action Network' })(enhancer)
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);