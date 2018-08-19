import { HttpClient, loadEndpoint } from '../../lib/common';
import { storeUserSession } from '../../lib/util';
import { STORAGE_KEY } from '../middleware/authentication';
import { LOGIN_USER_PENDING, LOGIN_USER_REJECTED, LOGIN_USER_RESOLVED, LOGOUT_USER } from '../types';
import { serviceRoutes } from '../../config/routes';

const { LOGIN } = serviceRoutes;

export const loginUser = credentials => {
    return (dispatch, getState) => {
        dispatch({ type: LOGIN_USER_PENDING });
        const state = getState();
        const url = loadEndpoint(state.env, LOGIN);
        HttpClient(state, getState).then(client => client.post(url, credentials))
            .then(result => {
                const newState = {
                    authentication: {
                        ...result.data.authentication,
                        isLoggedIn: true,
                        isTokenExpired: false
                    },
                    user: result.data.user
                };
                storeUserSession(newState, getState);
                return dispatch({ type: LOGIN_USER_RESOLVED, payload: newState });
            })
            .catch(err => dispatch({ type: LOGIN_USER_REJECTED, payload: err }));
    };
};

export const logoutUser = initializer => {
    return (dispatch) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
        dispatch({ type: LOGOUT_USER, payload: initializer });
    };
};
