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

import myReducerMiddleware from './state/middleware/authentication';

const authReducer = () => myReducerMiddleware();

import reducer from './state/reducers/index';

import App from './app';

const history = createBrowserHistory();

const initialState = { env: ENVIRONMENT || 'local' };

// const getFinalInitialState = initialState => {
//     const persistedState = JSON.parse(localStorage.getItem(STORAGE_KEY));
//     const expirationDate = _.get(persistedState, 'user.data.auth.expiresAt', null);
//     console.log(expirationDate);
//     const isExpired = moment(expirationDate).utc().isAfter(moment.utc());
//     console.log(isExpired);
//     if (isExpired) {
//         console.log('expired');
//         localStorage.setItem(STORAGE_KEY, JSON.stringify({}))
//     }
//
//     if (persistedState && !isExpired) {
//         return _.assign(initialState, persistedState);
//     }
//     return initialState
// };


const middleware = applyMiddleware(thunk);
const enhancer = compose(middleware, authReducer());

const store = createStore(
    reducer,
    initialState,
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