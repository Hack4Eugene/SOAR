import { ERROR, LOADING, NOT_STARTED, SUCCESS } from '../statusTypes';
import {
    GET_PROJECT_BY_ID_PENDING, GET_PROJECT_BY_ID_REJECTED, GET_PROJECT_BY_ID_RESOLVED,
    DELETE_PROJECT_REJECTED, DELETE_PROJECT_RESOLVED, 
    GET_PROJECTS_REJECTED, GET_PROJECTS_RESOLVED,
    GET_PROJECTS_BY_ORG_RESOLVED, GET_PROJECTS_BY_ORG_REJECTED,
    UPDATE_PROJECT_RESOLVED, UPDATE_PROJECT_PENDING, UPDATE_PROJECT_REJECTED,
    CREATE_PROJECT_RESOLVED, CREATE_PROJECT_PENDING, CREATE_PROJECT_REJECTED
} from '../types';

const initialState = {
    data: {},
    status: NOT_STARTED,
    selectedProject: {
        data: {},
        status: {
            get: NOT_STARTED,
            create: NOT_STARTED,
            update: NOT_STARTED
        }
    }, 
};

const projectReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_PROJECTS_RESOLVED: {
            return { 
                ...state, 
                data: payload.data, 
                status: SUCCESS 
            };
        }

        case GET_PROJECTS_REJECTED: {
            return { error: { ...payload }, status: ERROR };
        }

        case DELETE_PROJECT_RESOLVED: {
            return { ...state, status: SUCCESS };
        }

        case DELETE_PROJECT_REJECTED: {
            return { 
                ...state, 
                error: { ...payload }, 
                status: ERROR 
            };
        }

        case GET_PROJECTS_BY_ORG_RESOLVED: {
            return { 
                ...state, 
                projectsForOrganization: payload, 
                status: SUCCESS 
            };
        }

        case GET_PROJECTS_BY_ORG_REJECTED: {
            return { 
                ...state, 
                error: { ...payload }, 
                status: ERROR 
            };
        }

        /**
         * The Detailed section of the project state is for project/:id route.
         * The idea being we only hold one project detail in memory at once.
         * A project in detail may be very large.
         */
        case GET_PROJECT_BY_ID_RESOLVED: {
            return {
                ...state,
                selectedProject: {
                    data: payload.data,
                    status: { get: SUCCESS }
                }
            };
        }

        case GET_PROJECT_BY_ID_PENDING: {
            return {
                ...state,
                selectedProject: {
                    status: { get: LOADING }
                }
            };
        }

        case GET_PROJECT_BY_ID_REJECTED: {
            return {
                ...state,
                selectedProject: {
                    error: payload.error,
                    status: { get: ERROR }
                }
            };
        }

        case CREATE_PROJECT_PENDING: {
            return {
                ...state,
                selectedProject: {
                    status: { create: LOADING }
                }
            };
        }

        case CREATE_PROJECT_REJECTED: {
            return {
                ...state,
                selectedProject: {
                    error: payload,
                    status: { create: ERROR }
                }
            };
        }

        case CREATE_PROJECT_RESOLVED: {
            return {
                ...state,
                selectedProject: {
                    data: payload.data,
                    status: { create: SUCCESS }
                }
            };
        }

        case UPDATE_PROJECT_PENDING: {
            return {
                ...state,
                selectedProject: {
                    status: { update: LOADING }
                }
            };
        }

        case UPDATE_PROJECT_RESOLVED: {
            return {
                ...state,
                selectedProject: {
                    data: payload.data,
                    status: { update: SUCCESS }
                }
            };
        }

        case UPDATE_PROJECT_REJECTED: {
            return {
                ...state,
                selectedProject: {
                    error: payload.error,
                    status: { update: ERROR }
                }
            };
        }

        default: return state;
    }
};

export default projectReducer;
