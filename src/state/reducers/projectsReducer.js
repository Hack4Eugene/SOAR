import _ from 'lodash';

import { ERROR, LOADING, NOT_STARTED, SUCCESS } from '../statusTypes';
import {
    DELETE_PROJECT_REJECTED,
    DELETE_PROJECT_RESOLVED, GET_PROJECT_BY_ID_PENDING, GET_PROJECT_BY_ID_REJECTED, GET_PROJECT_BY_ID_RESOLVED,
    GET_PROJECTS_REJECTED,
    GET_PROJECTS_RESOLVED
} from '../types';

const initialState = {
    data: [],
    detailed: {
        status: NOT_STARTED
    },
    error: {},
    status: NOT_STARTED
};

const projectReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_PROJECTS_RESOLVED: {
            return { ...state, data: payload.data, status: SUCCESS };
        }

        case GET_PROJECTS_REJECTED: {
            return { error: { ...payload }, status: ERROR };
        }

        case DELETE_PROJECT_RESOLVED: {
            return { ...state, status: SUCCESS };
        }

        case DELETE_PROJECT_REJECTED: {
            return { ...state, error: { ...payload }, status: ERROR };
        }

        /**
         * The Detailed section of the project state is for project/:id route.
         * The idea being we only hold one project detail in memory at once.
         * A project in detail may be very large.
         */
        case GET_PROJECT_BY_ID_RESOLVED: {
            return {
                ...state,
                detailed: {
                    data: payload.data,
                    status: SUCCESS
                }
            };
        }

        case GET_PROJECT_BY_ID_PENDING: {
            return {
                ...state,
                detailed: {
                    status: LOADING
                }
            };
        }

        case GET_PROJECT_BY_ID_REJECTED: {
            return {
                ...state,
                detailed: {
                    error: payload.error,
                    status: ERROR
                }
            };
        }

        default: return state;
    }
};

export default projectReducer;
