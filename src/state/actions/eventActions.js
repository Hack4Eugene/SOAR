import _ from 'lodash';

import { HttpClient, loadEndpoint } from '../../lib/common';
import {
    CREATE_EVENT_REJECTED, CREATE_EVENT_RESOLVED,
    DELETE_EVENT_REJECTED,
    DELETE_EVENT_RESOLVED,
    GET_EVENTS_REJECTED,
    GET_EVENTS_RESOLVED, INCREMENT_EVENT_FINISH, SET_EVENTS_FINISHED,
    GET_EVENT_RESOLVED, GET_EVENT_REJECTED,
    UPDATE_EVENT_RESOLVED, UPDATE_EVENT_REJECTED,
    GET_EVENTS_BY_ID_RESOLVED, GET_EVENTS_BY_ID_REJECTED,
    GET_ATTENDEES_DETAILS_RESOLVED, GET_ATTENDEES_DETAILS_REJECTED,
} from '../types';

import { serviceRoutes } from '../../config/routes';

const { GET_EVENTS, GET_EVENTS_BY_ID, POST_EVENT, DELETE_EVENT, GET_EVENT_BY_ID, UPDATE_EVENT, GET_USERS_BY_IDS } = serviceRoutes;

export const getEvents = () => {
    return (dispatch, getState) => {
        HttpClient(getState(), dispatch)
            .then(client => client.get(loadEndpoint(_.get(getState(), 'env'), GET_EVENTS)))
            .then(result => dispatch({ type: GET_EVENTS_RESOLVED, payload: result }))
            .catch(err => dispatch({ type: GET_EVENTS_REJECTED, payload: err }));
    };
};

export const createEvent = (event) => {
    return (dispatch, getState) => {
        HttpClient(getState())
            .then(client => client.post(loadEndpoint(_.get(getState(), 'env'), POST_EVENT), event))
            .then(result => dispatch({ type: CREATE_EVENT_RESOLVED, payload: result }))
            .catch(err => dispatch({ type: CREATE_EVENT_REJECTED, payload: err }));
    };
};

export const deleteEvent = eventID => {
    return (dispatch, getState) => {
        HttpClient(getState()).then(client => client.delete(`${loadEndpoint(_.get(getState(), 'env'), DELETE_EVENT)}/${eventID}`))
            .then(result => dispatch({ type: DELETE_EVENT_RESOLVED }))
            .then(() => dispatch(getEvents()))
            .catch(err => dispatch({ type: DELETE_EVENT_REJECTED, payload: err }));
    };
};

export const setEventsFinished = (val) => {
    return (dispatch, getState) => {
        dispatch({
            type: SET_EVENTS_FINISHED,
            payload: val
        });
    };
};

export const incrementEventsFinished = () => {
    return (dispatch, getState) => {
        const currentVal = _.get(getState(), 'events.animationVal', null);
        const targetVal = _.get(getState(), 'events.numFinishedEvents', null);
        if (currentVal < targetVal) {
            dispatch({
                type: INCREMENT_EVENT_FINISH,
                payload: currentVal + 1
            });
        }
    };
};

export const getEventById = (eventId) => {
    return (dispatch, getState) => {
        const url = `${loadEndpoint(_.get(getState(), 'env'), `${GET_EVENT_BY_ID}/${eventId}`)}`;

        HttpClient(getState(), dispatch)
            .then(client => client.get(url))
            .then(result => dispatch({ type: GET_EVENT_RESOLVED, payload: result.data }))
            .catch(err => dispatch({ type: GET_EVENT_REJECTED, payload: err }));
    };
};

export const getEventsById = (eventIds) => {
    return (dispatch, getState) => {
        const url = `${loadEndpoint(_.get(getState(), 'env'), `${GET_EVENTS_BY_ID}/${eventIds}`)}`;

        HttpClient(getState(), dispatch)
            .then(client => client.get(url))
            .then(result => dispatch({ type: GET_EVENTS_BY_ID_RESOLVED, payload: result.data }))
            .catch(err => dispatch({ type: GET_EVENTS_BY_ID_REJECTED, payload: err }));
    };
};

export const updateEvent = (eventId, updateObj) => (dispatch, getState) => {
    const url = `${loadEndpoint(_.get(getState(), 'env'), `${UPDATE_EVENT}/${eventId}`)}`;

    HttpClient(getState())
        .then(client => client.post(url, updateObj))
        .then(result => {
            dispatch({ type: UPDATE_EVENT_RESOLVED });
            dispatch(getEventById(eventId));
        })
        .catch(err => dispatch({ type: UPDATE_EVENT_REJECTED, payload: err }));    
};

