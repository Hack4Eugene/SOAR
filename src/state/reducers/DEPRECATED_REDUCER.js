import _ from 'lodash';

import {
    LOGIN_USER_RESOLVED, LOGIN_USER_REJECTED,
    GET_ORGANIZATIONS_RESOLVED, GET_ORGANIZATIONS_REJECTED,
    ADD_ORG_RESOLVED,
    GET_EVENTS_RESOLVED, DELETE_EVENT_RESOLVED, DELETE_EVENT_REJECTED, ADD_EVENT_RESOLVED,
    SET_EVENTS_FINISHED, INCREMENT_EVENT_FINISH,
    GET_PROJECTS_RESOLVED, GET_PROJECTS_REJECTED, GET_PROJECTS_BY_ORG_RESOLVED, GET_PROJECTS_BY_ORG_REJECTED, 
    DELETE_PROJECT_RESOLVED, DELETE_PROJECT_REJECTED, API_ERROR,
    GET_EVENTS_REJECTED, LOGOUT_USER, GET_ORG_ID_RESOLVED, GET_ORG_ID_REJECTED,
    POST_USER_RESOLVED, POST_USER_PENDING, POST_USER_REJECTED,
    GET_EVENT_RESOLVED, GET_EVENT_REJECTED
} from '../types';
import { ERROR, LOADING, SUCCESS } from '../statusTypes';

const initialState = {
    user: {},
    events: [],
    selectedEvent: {},
    projects: [],
    profile: {}
};

const DEPRECATED_REDUCER = (state = initialState, action) => {
    const { type, payload = { message: '' } } = action;

    switch (type) {
        case SET_EVENTS_FINISHED: {
            return _.assign({}, state, { events: { ...state.events, numFinishedEvents: payload } });
        }

        case INCREMENT_EVENT_FINISH: {
            return _.assign({}, state, { events: { ...state.events, animationVal: payload } });
        }

        case ADD_EVENT_RESOLVED: {
            return _.assign({}, state, { events: [...state.events, payload] });
        }

        case DELETE_EVENT_RESOLVED: {
            return _.assign({}, state, { events: { ...state.events, status: SUCCESS } });
        }

        case DELETE_EVENT_REJECTED: {
            return _.assign({}, state, { events: { ...state.events, error: { ...payload }, status: ERROR } });
        }

        case ADD_ORG_RESOLVED: {
            return _.assign({}, state, { organizations: [...state.organizations, payload] });
        }

        case GET_ORG_ID_RESOLVED: {
            return _.assign({}, state, { profile: { ...state.profile,
organizations: {
                ..._.get(state.profile, 'organizations', []),
                data: payload.data,
                status: SUCCESS
            } } });
        }

        case GET_ORG_ID_REJECTED: {
            return _.assign({}, state, { profile: { ...state.profile, error: { ...payload }, status: ERROR } });
        }

        case GET_EVENTS_RESOLVED: {
            return _.assign({}, state, { events: { ...state.events, data: [...payload.data], status: SUCCESS } });
        }

        case GET_EVENTS_REJECTED: {
            return _.assign({}, state, { events: { error: { ...payload }, status: ERROR } });
        }

        case GET_EVENT_RESOLVED: {
            return _.assign({}, state, { selectedEvent: { ...payload, status: SUCCESS } })
        }

        case GET_EVENT_REJECTED: {
            return _.assign({}, state, { selectedEvent: { error: { ...payload }, status: ERROR } })
        }

        case LOGIN_USER_RESOLVED: {
            const { user, authentication } = payload;
            return _.assign({}, state, {
                user: {
                    ...user,
                    status: SUCCESS
                },
                authentication: {
                    ...authentication,
                    status: SUCCESS
                }
            });
        }

        case LOGIN_USER_REJECTED: {
            return _.assign({}, state, {
                ...state.user,
                ...state.authentication,
                user: {
                    error: payload,
                    status: ERROR
                },
                authentication: {
                    error: payload,
                    status: ERROR
                }
            });
        }

        case LOGOUT_USER: {
            return _.assign({}, state, {
                authentication: payload
            });
        }

        case POST_USER_RESOLVED: {
            return _.assign({}, state, { ...state.user, user: { ...payload, status: SUCCESS } });
        }
        case POST_USER_PENDING: {
            return _.assign({}, state, { ...state.user, user: { status: LOADING } });
        }
        case POST_USER_REJECTED: {
            return _.assign({}, state, { ...state.user, user: { error: { ...payload }, status: ERROR } });
        }

        case GET_PROJECTS_RESOLVED: {
            return _.assign({}, state, { projects: { ...state.projects, data: [...payload.data], status: SUCCESS } });
        }

        case GET_PROJECTS_REJECTED: {
            return _.assign({}, state, { projects: { error: { ...payload }, status: ERROR } });
        }

        case GET_PROJECTS_BY_ORG_RESOLVED: {
            return _.assign({}, state, { projectsForOrganization: { ...state.projectsForOrganization, data: [...payload.data], status: SUCCESS } })
        }

        case GET_PROJECTS_BY_ORG_REJECTED: {
            return _.assign({}, state, { projectsForOrganization: { error: { ...payload }, status: ERROR } })
        }

        case DELETE_PROJECT_RESOLVED: {
            return _.assign({}, state, { projects: { ...state.projects, status: SUCCESS } });
        }

        case DELETE_PROJECT_REJECTED: {
            return _.assign({}, state, { projects: { ...state.projects, error: { ...payload }, status: ERROR } });
        }

        case GET_ORGANIZATIONS_RESOLVED: {
            return _.assign({}, state, { organizations: { ...state.organizations, data: [...payload.data], status: SUCCESS } });
        }

        case GET_ORGANIZATIONS_REJECTED: {
            return _.assign({}, state, { organizations: { ...state.organizations, error: { ...payload }, status: ERROR } });
        }

        default: return state;
    }
};

export default DEPRECATED_REDUCER;
