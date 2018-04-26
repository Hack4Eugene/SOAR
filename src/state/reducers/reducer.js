import _ from 'lodash';
import moment from 'moment';

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

const initialState = {
    user: {},
    events: [],
    projects: []
};

const reducer = (state = initialState, action) => {
    const { type, payload = { message: '' } } = action;

    switch(type) {
        case SET_EVENTS_FINISHED: {
            return _.assign(...state, { events: { ...state.events, numFinishedEvents: payload } })
        }

        case INCREMENT_EVENT_FINISH: {
            return _.assign(...state, { events: { ...state.events, animationVal: payload } })
        }

        case ADD_EVENT_RESOLVED: {
            console.log('reducer', payload.data)
            return _.assign(...state, { events: [ ...state.events, payload ] })
        }

        case ADD_ORG_RESOLVED: {
            return _.assign(...state, { organizations: [ ...state.organizations, payload ] })
        }

        case GET_EVENTS_RESOLVED: {
            return _.assign(...state, { events: [ ...state.events, payload.data ] })
        }

        case LOGIN_USER_RESOLVED: {
            return _.assign(...state, { user: [ ...state.user, payload ] })
        }

        case LOGIN_USER_REJECTED: {
            return _.assign(...state, { events: [ ...state.events, payload ] })
        }

        default: return state;
    }
};

export default reducer