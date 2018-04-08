import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createBrowserHistory from 'history/createBrowserHistory';

import reducer from './state/reducers/index';

import App from './app';

const history = createBrowserHistory();

const middleware = applyMiddleware(thunk);
const enhancer = compose(middleware);

const store = createStore(
    reducer,
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