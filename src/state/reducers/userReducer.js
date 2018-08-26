import { ERROR, LOADING, NOT_STARTED, SUCCESS } from '../statusTypes';
import {
    LOGIN_USER_REJECTED,
    LOGIN_USER_RESOLVED,
    POST_USER_PENDING,
    POST_USER_REJECTED,
    POST_USER_RESOLVED
} from '../types';

const initialState = {
    user: {
        status: NOT_STARTED
    }
};

const userReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_USER_RESOLVED: {
            return {
                ...payload.user,
                status: SUCCESS
            };
        }

        case LOGIN_USER_REJECTED: {
            return {
                error: payload,
                status: ERROR
            };
        }

        case POST_USER_RESOLVED: {
            return {
                ...payload.user,
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

export default userReducer;
