import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createBrowserHistory from 'history/createBrowserHistory';

import myReducerMiddleware, { persistState } from './state/middleware/authentication';

import reducer from './state/reducers/rootReducer';

import App from './app';

const authReducer = () => myReducerMiddleware();
// import myReducerMiddleware from './state/middleware/authentication';

const history = createBrowserHistory();

const initialState = { env: window.ENVIRONMENT || 'local' };

const middleware = applyMiddleware(thunk);
const enhancer = compose(middleware, authReducer());

const store = createStore(
    reducer,
    persistState(initialState),
    composeWithDevTools({ name: 'Emerald Compassionate Action Network' })(enhancer)
    // TODO: replace this when ready
    // initialState.env === 'production'
    //     ? composeWithDevTools({ name: 'Emerald Compassionate Action Network' })(enhancer)
    //     : composeWithDevTools({ name: 'Emerald Compassionate Action Network' })(enhancer)
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
