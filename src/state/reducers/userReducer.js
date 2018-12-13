import { ERROR, LOADING, NOT_STARTED, SUCCESS } from '../statusTypes';
import {
    LOGIN_USER_REJECTED,
    LOGIN_USER_RESOLVED,
    POST_USER_PENDING,
    POST_USER_REJECTED,
    POST_USER_RESOLVED,
    DELETE_USER_RESOLVED,
    DELETE_USER_REJECTED,
    DELETE_USER_PENDING
} from '../types';

const initialState = {
    user: {
        data: {},
        status: NOT_STARTED,
        deleted_status: NOT_STARTED
    }
};

const userReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_USER_RESOLVED: {
            return {
                data: {
                    ...payload.user
                },
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
                data: {
                    ...payload
                },
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

        case DELETE_USER_RESOLVED: {
            return {
                data: {
                    ...payload
                },
                deleted_status: SUCCESS
            };
        }

        case DELETE_USER_PENDING: {
            return {
                deleted_status: LOADING
            };
        }

        case DELETE_USER_REJECTED: {
            return {
                error: {
                    ...payload
                },
                deleted_status: ERROR
            };
        }

        default: return state;
    }
};

export default userReducer;
