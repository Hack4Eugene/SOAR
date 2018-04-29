import _ from 'lodash';

import {
    LOGIN_USER_RESOLVED, LOGIN_USER_REJECTED,
    GET_ORGANIZATIONS_RESOLVED, GET_ORGANIZATIONS_REJECTED,
    ADD_ORG_RESOLVED,
    GET_EVENTS_RESOLVED, DELETE_EVENT_RESOLVED, DELETE_EVENT_REJECTED, ADD_EVENT_RESOLVED,
    SET_EVENTS_FINISHED, INCREMENT_EVENT_FINISH,
    GET_PROJECTS_RESOLVED, GET_PROJECTS_REJECTED, DELETE_PROJECT_RESOLVED, DELETE_PROJECT_REJECTED, API_ERROR,
    GET_EVENTS_REJECTED, LOGOUT_USER
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

        case DELETE_EVENT_RESOLVED: {
            return _.assign({}, state, { events: { ...state.events, Status: SUCCESS }})
        }

        case DELETE_EVENT_REJECTED: {
            return _.assign({}, state, { events: { ...state.events, error: { ...payload }, Status: ERROR }})
        }

        case ADD_ORG_RESOLVED: {
            return _.assign({}, state, { organizations: [ ...state.organizations, payload ] })
        }

        case GET_EVENTS_RESOLVED: {
            return _.assign({}, state, { events: { ...state.events, data: [...payload.data], Status: SUCCESS } })
        }

        case GET_EVENTS_REJECTED: {
            return _.assign({}, state, { events: { error: { ...payload }, Status: ERROR }})
        }

        case LOGIN_USER_RESOLVED: {
            const { user, authentication } = payload;
            return _.assign({}, state, {
                user: {
                    ...user,
                    Status: SUCCESS
                },
                authentication: {
                    ...authentication,
                    Status: SUCCESS
                }
            })
        }

        case LOGIN_USER_REJECTED: {
            return _.assign({}, state, {
                user: {
                    ...state.user,
                    Status: ERROR
                },
                authentication: {
                    ...state.authentication,
                    Status: ERROR
                }
            })
        }

        case LOGOUT_USER: {
            return _.assign({}, state, {
                authentication: payload
            })
        }

        case GET_PROJECTS_RESOLVED: {
            return _.assign({}, state, { projects: { ...state.projects, data: [...payload.data], Status: SUCCESS }})
        }

        case GET_PROJECTS_REJECTED: {
            return _.assign({}, state, { projects: { error: { ...payload }, Status: ERROR }})
        }

        case DELETE_PROJECT_RESOLVED: {
            return _.assign({}, state, { projects: { ...state.projects, Status: SUCCESS }})
        }

        case DELETE_PROJECT_REJECTED: {
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