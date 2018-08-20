import _ from 'lodash';

import {
    loadEndpoint,
    HttpClient,
    serialize
} from '../../lib/common';

import {
    storeUserSession
} from '../../lib/util';

import { STORAGE_KEY } from '../middleware/authentication';

const {
    LOGIN,
    GET_USERS,
    POST_USER,
    DELETE_USER,
    GET_USER_BY_ID,
    GET_ORGANIZATIONS,
    POST_ORGANIZATION,
    DELETE_ORGANIZATION,
    GET_ORGANIZATION_BY_ID,
    GET_PROJECTS,
    POST_PROJECT,
    DELETE_PROJECT,
    GET_PROJECT_BY_ID,
    GET_PROJECTS_BY_ORGANIZATION,
    GET_EVENTS,
    POST_EVENT,
    DELETE_EVENT,
    GET_EVENT_BY_ID,
    GET_EVENTS_FOR_PROJECTS,
} = serviceRoutes;

import {
    LOGOUT_USER,
    POST_USER_PENDING,
    POST_USER_RESOLVED,
    POST_USER_REJECTED,
    GET_USER_BY_ID_RESOLVED,
    GET_USER_BY_ID_PENDING,
    GET_USER_BY_ID_REJECTED,
    GET_ORGANIZATIONS_RESOLVED,
    GET_ORGANIZATIONS_REJECTED,
    GET_ORG_ID_REJECTED,
    GET_ORG_ID_RESOLVED,
    ADD_ORG_RESOLVED,
    ADD_ORG_REJECTED,
    SET_EVENTS_FINISHED,
    INCREMENT_EVENT_FINISH,
    ADD_EVENT_RESOLVED,
    ADD_EVENT_REJECTED,
    GET_EVENTS_RESOLVED,
    GET_EVENTS_REJECTED,
    DELETE_EVENT_RESOLVED,
    DELETE_EVENT_REJECTED,
    LOGIN_USER_RESOLVED,
    LOGIN_USER_REJECTED,
    GET_PROJECTS_RESOLVED,
    GET_PROJECTS_REJECTED,
    GET_PROJECTS_BY_ORG_REJECTED,
    GET_PROJECTS_BY_ORG_RESOLVED, LOGIN_USER_PENDING, DELETE_PROJECT_REJECTED, DELETE_PROJECT_RESOLVED, API_ERROR
} from '../types';

import {
    serviceRoutes
} from '../../config/routes';

/*
    Todo: Make the id being passed as a param to certain routes dynamic.
    Todo: Typically this is just a projectID or organizationID -
    Todo: ideally both can be find in the user object in redux state.
 */

/*
 User Actions
 */

export const loginUser = credentials => {
    return (dispatch, getState) => {
        dispatch({ type: LOGIN_USER_PENDING });
        const state = getState();
        const url = loadEndpoint(state.env, LOGIN);
            HttpClient(state, getState).then(client => client.post(url, credentials))
                .then(result => {
                    const newState = {
                        authentication: { ...result.data.authentication, isLoggedIn: true, isTokenExpired: false },
                        user: result.data.user
                    };
                    storeUserSession(newState, getState);
                    return dispatch({ type: LOGIN_USER_RESOLVED, payload: newState })
                })
                .catch(err => dispatch({ type: LOGIN_USER_REJECTED, payload: err }))
    }
};

export const logoutUser = initializer => {
    return (dispatch) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
        dispatch({ type: LOGOUT_USER, payload: initializer })
    }
};

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
                return dispatch({ type: POST_USER_RESOLVED, payload: newState })
            })
            .catch(err => dispatch({ type: POST_USER_REJECTED, payload: err }))
    }
};

export const getUserByID = () => (dispatch, getState) => {
    dispatch({ type: GET_USER_BY_ID_PENDING });
    const state = getState();
    HttpClient(state).then(client => dispatch(client.get(loadEndpoint(state.env, GET_USER_BY_ID))))
};

/*
    Organization Actions
 */

export const getOrganizations = organizationIds => {
    return (dispatch, getState) => {
        HttpClient(getState()).then(client => client.get(loadEndpoint(_.get(getState(), 'env'), GET_ORGANIZATIONS)))
            .then(result => dispatch({ type: GET_ORGANIZATIONS_RESOLVED, payload: result }))
            .catch(err => dispatch({ type: GET_ORGANIZATIONS_REJECTED, payload: err }))
    }
};

export const addOrganization = (org) => {
    return (dispatch, getState) => {
        HttpClient(getState()).then(client => client.post(
            loadEndpoint(
                _.get(getState(), 'env'), POST_ORGANIZATION), serialize(org)
            ))
                .then(result => dispatch({ type: ADD_ORG_RESOLVED, payload: result }))
                .catch(err => dispatch({ type: ADD_ORG_REJECTED, error: err }));
    }
};

export const getOrganizationsById = ids => {
    // if (!ids) return;
    return (dispatch, getState) => {
        const url = loadEndpoint(_.get(getState(), 'env'), GET_ORGANIZATION_BY_ID) + `/${ids.join('&')}`;
        console.log(url);
        HttpClient(getState()).then(client => client.get(url))
            .then(result => dispatch({ type: GET_ORG_ID_RESOLVED, payload: result }))
            .catch(err => dispatch({ type: GET_ORG_ID_REJECTED, payload: err }));
    }
};

/*
 Project Actions
 */

export const getProjectsByOrganization = id => {
    return (dispatch, getState) => {
        HttpClient(getState()).then(client => client.get(
            loadEndpoint(
                _.get(getState(), 'env'), GET_PROJECTS_BY_ORGANIZATION) + `/${id}`
            ))
                .then(result => dispatch({ type: GET_PROJECTS_BY_ORG_RESOLVED, payload: result }))
                .catch(err => dispatch({ type: GET_PROJECTS_BY_ORG_REJECTED, payload: err }))
    }
};

export const getProjects = () => {
    return (dispatch, getState) => {
        HttpClient(getState()).then(client => client.get(loadEndpoint( _.get(getState(), 'env'), GET_PROJECTS)))
            .then(result => dispatch({ type: GET_PROJECTS_RESOLVED, payload: result }))
            .catch(err => dispatch({ type: GET_PROJECTS_REJECTED, payload: err }))
    }
};

export const deleteProject = projectID => {
    return (dispatch, getState) => {
        HttpClient(getState()).then(client => client.delete(
            `${loadEndpoint( _.get(getState(), 'env'), DELETE_PROJECT)}/${projectID}`
        ))
            .then(result => dispatch({ type: DELETE_PROJECT_RESOLVED }))
            .then(() => dispatch(getProjects()))
            .catch(err => dispatch({ type: DELETE_PROJECT_REJECTED, payload: err }))
    }
};

/*
    Event Actions
 */

export const getEvents = () => {
    return (dispatch, getState) => {
        HttpClient(getState(), dispatch)
            .then(client => client.get(loadEndpoint(_.get(getState(), 'env'), GET_EVENTS)))
            .then(result => dispatch({ type: GET_EVENTS_RESOLVED, payload: result }))
            .catch(err => dispatch({ type: GET_EVENTS_REJECTED, payload: err  }))

    }
};

export const createEvent = (event) => {
    return (dispatch, getState) => {
        HttpClient(getState()).then(client => client.post(
            loadEndpoint(_.get(getState(), 'env'), POST_EVENT), event
        ))
            .then(result => {
                dispatch({ type: ADD_EVENT_RESOLVED, payload: result });
            })
            .catch(err => dispatch({ type: ADD_EVENT_REJECTED, error: err }));
    }
};

export const deleteEvent = eventID => {
    return (dispatch, getState) => {
        HttpClient(getState()).then(client => client.delete(`${loadEndpoint( _.get(getState(), 'env'), DELETE_EVENT)}/${eventID}`))
            .then(result => dispatch({ type: DELETE_EVENT_RESOLVED }))
            .then(() => dispatch(getEvents()))
            .catch(err => dispatch({ type: DELETE_EVENT_REJECTED, payload: err }))
    }
};

export const setEventsFinished = (val) => {
    return (dispatch, getState) => {
        dispatch({
            type: SET_EVENTS_FINISHED,
            payload: val
        })
    }
};

export const incrementEventsFinished = () => {
    return (dispatch, getState) => {
        const currentVal = _.get(getState(), 'events.animationVal', null);
        const targetVal = _.get(getState(), 'events.numFinishedEvents', null);
        if (currentVal < targetVal) {
            dispatch({
                type: INCREMENT_EVENT_FINISH,
                payload: currentVal + 1
            })
        }
    }
};
