import _ from 'lodash';

import { ERROR, NOT_STARTED, SUCCESS } from '../statusTypes';
import {
    DELETE_PROJECT_REJECTED,
    DELETE_PROJECT_RESOLVED,
    GET_PROJECTS_REJECTED,
    GET_PROJECTS_RESOLVED
} from '../types';

const initialState = {
    data: [],
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

        default: return state;
    }
};

export default projectReducer;
