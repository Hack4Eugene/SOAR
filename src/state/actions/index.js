import _ from 'lodash';

import {
    request,
    loadEndpoint,
} from '../../lib/common';

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
    SET_EVENTS_FINISHED,
    INCREMENT_EVENT_FINISH,
    ADD_EVENT_RESOLVED,
    ADD_EVENT_REJECTED,
    GET_EVENTS_RESOLVED,
    GET_EVENTS_REJECTED,
    ADD_ORG_RESOLVED,
    ADD_ORG_REJECTED,
    LOGIN_USER_RESOLVED,
    LOGIN_USER_REJECTED,
    GET_PROJECTS_BY_ORG_REJECTED,
    GET_PROJECTS_BY_ORG_RESOLVED, LOGIN_USER_PENDING
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
        dispatch({ type: LOGIN_USER_PENDING, payload: credentials });

        const url = loadEndpoint(LOGIN)
        console.log(url);

        request({
            method: 'post',
            url,
            data: JSON.stringify(credentials)
        })
            .then(result => dispatch({ type: LOGIN_USER_RESOLVED, payload: result }))
            .catch(err => dispatch({ type: LOGIN_USER_REJECTED, payload: err }));
    }
};

/*
    Organization Actions
 */

export const addOrganization = (org) => {
    return (dispatch, getState) => {
        request({
            method: 'post',
            url: loadEndpoint(POST_ORGANIZATION),
            data: org
        })
            .then(result => {
                dispatch({ type: ADD_ORG_RESOLVED, payload: result })
                console.log(result)
            })
            .catch(err => dispatch({ type: ADD_ORG_REJECTED, error: err }));
    }
};

/*
 Project Actions
 */

export const getProjectsByOrganization = () => {
    return (dispatch, getState) => {
        request({
            method: 'get',
            url: loadEndpoint(GET_PROJECTS_BY_ORGANIZATION) + '/5ac9877976448030b88ac636', //Todo is about this
        })
            .then(result => dispatch({ type: GET_PROJECTS_BY_ORG_RESOLVED, payload: result }))
            .catch(err => dispatch({ type: GET_PROJECTS_BY_ORG_REJECTED, payload: err }))
    }
};

/*
    Event Actions
 */

export const getEvents = () => {
    return (dispatch, getState) => {
        request({
            method: 'get',
            url: loadEndpoint(GET_EVENTS),
        })
            .then(result => {
                dispatch({ type: GET_EVENTS_RESOLVED, payload: result })
            })
            .catch(err => dispatch({ type: GET_EVENTS_REJECTED, error: err }));
    }
};

export const createEvent = (event) => {
    return (dispatch, getState) => {
        request({
            method: 'post',
            url: loadEndpoint(POST_EVENT),
            data: event
        })
            .then(result => {
                dispatch({ type: ADD_EVENT_RESOLVED, payload: result });
                console.log(result)
            })
            .catch(err => dispatch({ type: ADD_EVENT_REJECTED, error: err }));
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
