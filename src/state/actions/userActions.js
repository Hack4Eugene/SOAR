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
    POST_USER_RESOLVED,
    UPDATE_USER_PENDING,
    UPDATE_USER_REJECTED,
    UPDATE_USER_RESOLVED,
    DELETE_USER_PENDING,
    DELETE_USER_RESOLVED,
    DELETE_USER_REJECTED
} from '../types';
import { serviceRoutes } from '../../config/routes';
import { loginUser } from './authenticationActions';

const { POST_USER, UPDATE_USER } = serviceRoutes;

export const createUser = profile => {
    return (dispatch, getState) => {
        dispatch({ type: POST_USER_PENDING });
        const state = getState();
        const url = loadEndpoint(state.env, POST_USER);
        const credentials = {
            username: profile.username,
            password: profile.password
        };

        let logUserIn = false;
        if (credentials.username && credentials.password) {
            logUserIn = true;
        }

        HttpClient(state).then(client => client.post(url, serialize(profile)))
            .then(result => dispatch({ type: POST_USER_RESOLVED, payload: result.data }))
            .then(() => {
                if (logUserIn) {
                    return dispatch(loginUser(credentials));
                }
                return;
            })
            .catch(err => dispatch({ type: POST_USER_REJECTED, payload: stripAxiosRequestFromError(err) }));
    };
};

export const updateUser = (id, updates) => {
    
    return (dispatch, getState) => {
        dispatch({ type: UPDATE_USER_PENDING });
        
        const state = getState();
        const url = `${loadEndpoint(state.env, UPDATE_USER)}/${id}`;

        HttpClient(getState())
            .then(client => client.post(url, updates))
            .then(result => dispatch({ type: UPDATE_USER_RESOLVED, payload: result.data }))
            // .then(() => dispatch(getUserByID()))
            .catch(err => dispatch({ type: UPDATE_USER_REJECTED, payload: err }));
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

export const deleteUser = userID => (dispatch, getState) => {
    dispatch({ type: DELETE_USER_PENDING });

    const state = getState();
    const endpointUrl = `${loadEndpoint(state.env, serviceRoutes.DELETE_USER)}/${userID}`;

    HttpClient(state)
    .then(client => client.delete(endpointUrl)
        .then(result => dispatch({ type: DELETE_USER_RESOLVED, payload: result }))
        .catch(err => dispatch({ type: DELETE_USER_REJECTED, payload: err })));
};
