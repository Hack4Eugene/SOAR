import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createBrowserHistory from 'history/createBrowserHistory';

import myReducerMiddleware, { STORAGE_KEY, persistedState } from './state/middleware/authentication';

const authReducer = () => myReducerMiddleware();

import reducer from './state/reducers/index';

import App from './app';
// import myReducerMiddleware from './state/middleware/authentication';

const history = createBrowserHistory();

const initialState = { env: ENVIRONMENT || 'local' };

const middleware = applyMiddleware(thunk);
const enhancer = compose(middleware, authReducer());

const store = createStore(
    reducer,
    persistedState(initialState),
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