import { HttpClient, loadEndpoint, serialize } from '../../lib/common';
import { GET_USER_BY_ID_PENDING, POST_USER_PENDING, POST_USER_REJECTED, POST_USER_RESOLVED } from '../types';
import { serviceRoutes } from '../../config/routes';

const { POST_USER } = serviceRoutes;

export const createUser = profile => {
    return (dispatch, getState) => {
        dispatch({ type: POST_USER_PENDING });
        const state = getState();
        const url = loadEndpoint(state.env, POST_USER);
        HttpClient(state).then(client => client.post(url, serialize(profile)))
            .then(result => {
                const newState = {
                    authentication: { ...result.data.authentication, isLoggedIn: true, isTokenExpired: false },
                    user: result.data.user
                };
                return dispatch({ type: POST_USER_RESOLVED, payload: newState });
            })
            .catch(err => dispatch({ type: POST_USER_REJECTED, payload: err }));
    };
};

export const getUserByID = () => (dispatch, getState) => {
    dispatch({ type: GET_USER_BY_ID_PENDING });
    const state = getState();
    HttpClient(state).then(client => dispatch(client.get(loadEndpoint(state.env, serviceRoutes.GET_USER_BY_ID))));
};
