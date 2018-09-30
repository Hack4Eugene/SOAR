import { HttpClient, loadEndpoint, serialize } from '../../lib/common';
import { stripAxiosRequestFromError } from '../../lib/util';
import {
    GET_USER_BY_ID_PENDING,
    GET_USER_BY_ID_RESOLVED,
    GET_USER_BY_ID_REJECTED,
    GET_USERS_BY_IDS_PENDING,
    GET_USERS_BY_IDS_RESOLVED,
    GET_USERS_BY_IDS_REJECTED,
    POST_USER_PENDING,
    POST_USER_REJECTED,
    POST_USER_RESOLVED
} from '../types';
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
            .catch(err => dispatch({ type: POST_USER_REJECTED, error: stripAxiosRequestFromError(err) }));
    };
};

export const getUserByID = () => (dispatch, getState) => {
    dispatch({ type: GET_USER_BY_ID_PENDING });

    const endpointUrl = loadEndpoint(state.env, serviceRoutes.GET_USER_BY_ID);
    const state = getState();

    HttpClient(state)
    .then(client => {
        dispatch({ type: GET_USER_BY_ID_RESOLVED, payload: client.get(endpointUrl) });
    })
        .catch(err => {
            dispatch({ type: GET_USER_BY_ID_REJECTED, payload: err });
        });
};

export const getUsersByIds = () => (dispatch, getState) => {
    dispatch({ type: GET_USERS_BY_IDS_PENDING });

    const endpointUrl = loadEndpoint(state.env, serviceRoutes.GET_USERS_BY_IDS);
    const state = getState();

    HttpClient(state)
    .then(client => client.get(endpointUrl)
        .then(result => dispatch({ type: GET_USERS_BY_IDS_RESOLVED, payload: result }))
        .catch(err => dispatch({ type: GET_USERS_BY_IDS_REJECTED, payload: err })));
};
