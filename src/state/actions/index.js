import _ from 'lodash';
import axios from 'axios';

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
    LOGIN_USER_REJECTED
} from '../types';

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

export const addEventToProject = (event) => {
    // console.log('event', event)
    return (dispatch, getState) => {
        axios({
            method: 'post',
            url: 'http://ec2-34-216-120-61.us-west-2.compute.amazonaws.com:3000/event',
            data: event,
            headers: {
                'Content-Type': 'application/json'        
            }
          })
        .then(result => {
            dispatch({ type: ADD_EVENT_RESOLVED, payload: result })
            // console.log(result)
        })
        .then(() => dispatch(getEventsForProject()))
        .catch(err => dispatch({ type: ADD_EVENT_REJECTED, error: err }));
    }
};

export const getEventsForProject = () => {
    return (dispatch, getState) => {
        axios.get('http://ec2-34-216-120-61.us-west-2.compute.amazonaws.com/events')
        .then(result => {
            // console.log('action result', result)
            dispatch({ type: GET_EVENTS_RESOLVED, payload: result })
        })
        .catch(err => dispatch({ type: GET_EVENTS_REJECTED, error: err }));
    }
};

// export const addOrganizationForUser = () => {
//     return (dispatch, getState) => {
//         axios.post('https://jsonplaceholder.typicode.com/posts/')
//         .then(result => dispatch({ type: ADD_ORG_RESOLVED, payload: result }))
//         .catch(err => dispatch({ type: ADD_ORG_REJECTED, error: err }));
//     }
// }

export const addOrganization = (org) => {
    // console.log('event', org)
    return (dispatch, getState) => {
        axios({
            method: 'post',
            url: 'ec2-34-216-120-61.us-west-2.compute.amazonaws.com:3000/organization',
            data: org,
            headers: {
                'Content-Type': 'application/json'        
            }
          })
        .then(result => {
            dispatch({ type: ADD_ORG_RESOLVED, payload: result })
            // console.log(result)
        })
        .catch(err => dispatch({ type: ADD_ORG_REJECTED, error: err }));
    }
}

export const loginUser = (username, password) => {
    return (dispatch, getState) => {
        axios({
            method: 'post',
            url: 'http://ec2-34-216-120-61.us-west-2.compute.amazonaws.com:3000/login',
            data: {
              username: username,
              password: password
            }
          })
        .then(result => dispatch({ type: LOGIN_USER_RESOLVED, payload: result.data }))
        .catch(err => dispatch({ type: LOGIN_USER_REJECTED, error: err }));
    }
}
