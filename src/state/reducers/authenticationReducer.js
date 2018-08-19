import { ERROR, LOADING, NOT_STARTED, SUCCESS } from '../statusTypes';
import {
    LOGIN_USER_REJECTED,
    LOGIN_USER_RESOLVED, LOGOUT_USER,
    POST_USER_PENDING,
    POST_USER_REJECTED,
    POST_USER_RESOLVED
} from '../types';

const initialState = {
    authentication: {
        status: NOT_STARTED
    }
};

const authenticationReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_USER_RESOLVED: {
            return {
                ...state,
                ...payload.authentication,
                status: SUCCESS

            };
        }

        case LOGIN_USER_REJECTED: {
            return {
                error: payload,
                status: ERROR
            };
        }

        case LOGOUT_USER: {
            return {
                payload
            };
        }

        case POST_USER_RESOLVED: {
            return {
                ...payload.authentication,
                status: SUCCESS
            };
        }

        case POST_USER_PENDING: {
            return {
                status: LOADING
            };
        }

        case POST_USER_REJECTED: {
            return {
                error: {
                    ...payload
                },
                status: ERROR
            };
        }

        default: return state;
    }
};

export default authenticationReducer;
