import _ from 'lodash';

import {
    SET_EVENTS_FINISHED,
    INCREMENT_EVENT_FINISH,
    ADD_EVENT_RESOLVED,
    GET_EVENTS_RESOLVED,
    ADD_ORG_RESOLVED,
    LOGIN_USER_RESOLVED,
    LOGIN_USER_REJECTED, GET_PROJECTS_RESOLVED, GET_PROJECTS_REJECTED, GET_ORGANIZATIONS_RESOLVED,
    GET_ORGANIZATIONS_REJECTED
} from '../types';
import { ERROR, SUCCESS } from '../statusTypes';

const initialState = {
    user: {},
    events: [],
    projects: []
};

const reducer = (state = initialState, action) => {
    const { type, payload = { message: '' } } = action;

    switch(type) {
        case SET_EVENTS_FINISHED: {
            return _.assign({}, state, { events: { ...state.events, numFinishedEvents: payload } })
        }

        case INCREMENT_EVENT_FINISH: {
            return _.assign({}, state, { events: { ...state.events, animationVal: payload } })
        }

        case ADD_EVENT_RESOLVED: {
            return _.assign({}, state, { events: [ ...state.events, payload ] })
        }

        case ADD_ORG_RESOLVED: {
            return _.assign({}, state, { organizations: [ ...state.organizations, payload ] })
        }

        case GET_EVENTS_RESOLVED: {
            return _.assign({}, state, { events: { ...state.events, data: [...payload.data], Status: SUCCESS } })
        }

        case LOGIN_USER_RESOLVED: {
            return _.assign({}, state, { user: { ...state.user, ...payload, Status: SUCCESS } })
        }

        case LOGIN_USER_REJECTED: {
            return _.assign({}, state, { user: { ...state.user, ...payload, Status: ERROR } })
        }

        case GET_PROJECTS_RESOLVED: {
            return _.assign({}, state, { projects: { ...state.projects, data: [...payload.data], Status: SUCCESS }})
        }

        case GET_PROJECTS_REJECTED: {
            return _.assign({}, state, { projects: { ...state.projects, error: { ...payload }, Status: ERROR }})
        }

        case GET_ORGANIZATIONS_RESOLVED: {
            return _.assign({}, state, { organizations: { ...state.organizations, data: [...payload.data], Status: SUCCESS }})
        }

        case GET_ORGANIZATIONS_REJECTED: {
            return _.assign({}, state, { organizations: { ...state.organizations, error: { ...payload }, Status: ERROR }})
        }

        default: return state;
    }
};

export default reducer