import _ from 'lodash';
import axios from 'axios';
import {
    request,
    loadEndpoint
} from '../../lib/common';

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
    GET_PROJECTS_BY_ORG_RESOLVED
} from '../types';

/*
 User Actions
 */

export const loginUser = (username, password) => {
    return (dispatch, getState) => {
        axios({
            method: 'post',
            url: 'http://localhost:3000/login',
            data: {
                username: username,
                password: password
            }
        })
            .then(result => dispatch({ type: LOGIN_USER_RESOLVED, payload: result.data }))
            .catch(err => dispatch({ type: LOGIN_USER_REJECTED, error: err }));
    }
};

/*
    Organization Actions
 */

export const addOrganization = (org) => {
    return (dispatch, getState) => {
        axios({
            method: 'post',
            url: 'http://localhost:3000/organization',
            data: org,
            headers: {
                'Content-Type': 'application/json'
            }
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
            url: loadEndpoint('GET_PROJECTS_BY_ORGANIZATION') + '/5ac9877976448030b88ac636',
            method: 'get',
        })
            .then(result => dispatch({ type: GET_PROJECTS_BY_ORG_RESOLVED, payload: result }))
            .catch(err => dispatch({ type: GET_PROJECTS_BY_ORG_REJECTED, payload: err }))
    }
};

/*
    Event Actions
 */

export const createEvent = (event) => {
    return (dispatch, getState) => {
        request({
            url: loadEndpoint('POST_EVENT'),
            method: 'post',
            data: event,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(result => {
                dispatch({ type: ADD_EVENT_RESOLVED, payload: result });
                console.log(result)
            })
            .catch(err => dispatch({ type: ADD_EVENT_REJECTED, error: err }));
    }
};

export const getEvents = () => {
    return (dispatch, getState) => {
        request({
            url: loadEndpoint('GET_EVENTS')
        })
            .then(result => {
                dispatch({ type: GET_EVENTS_RESOLVED, payload: result })
            })
            .catch(err => dispatch({ type: GET_EVENTS_REJECTED, error: err }));
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
