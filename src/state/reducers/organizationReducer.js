import { ERROR, NOT_STARTED, SUCCESS } from '../statusTypes';
import {
    ADD_ORG_RESOLVED,
    GET_ORGANIZATIONS_REJECTED,
    GET_ORGANIZATIONS_RESOLVED
} from '../types';

const initialState = {
    data: [],
    status: NOT_STARTED
};

const organizationReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ADD_ORG_RESOLVED: {
            return { ...state, payload };
        }

        case GET_ORGANIZATIONS_RESOLVED: {
            return { ...state, data: [...payload.data], status: SUCCESS };
        }

        case GET_ORGANIZATIONS_REJECTED: {
            return { ...state, error: { ...payload }, status: ERROR };
        }

        default: return state;
    }
};

export default organizationReducer;
