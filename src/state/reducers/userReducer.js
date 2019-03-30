import { ERROR, LOADING, NOT_STARTED, SUCCESS } from '../statusTypes';
import {
    LOGIN_USER_REJECTED,
    LOGIN_USER_RESOLVED,
    POST_USER_PENDING,
    POST_USER_REJECTED,
    POST_USER_RESOLVED,
    UPDATE_USER_PENDING,
    UPDATE_USER_REJECTED,
    UPDATE_USER_RESOLVED,
    DELETE_USER_RESOLVED,
    DELETE_USER_REJECTED,
    DELETE_USER_PENDING
} from '../types';

const initialState = {
    user: {
        data: {},
        status: {
            get: NOT_STARTED,
            create: NOT_STARTED,
            update: NOT_STARTED
        }
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
                status: {
                    ...state.status,
                    create: NOT_STARTED,
                    get: SUCCESS
                }
            };
        }

        case LOGIN_USER_REJECTED: {
            return {
                error: payload,
                status: {
                    ...state.status,
                    get: ERROR
                }
            };
        }

        case POST_USER_RESOLVED: {
            return {
                data: {
                    ...payload
                },
                status: {
                    ...state.status,
                    create: SUCCESS
                }
            };
        }

        case POST_USER_PENDING: {
            return {
                status: {
                    ...state.status,
                    create: LOADING
                }
            };
        }

        case POST_USER_REJECTED: {
            return {
                error: {
                    ...payload
                },
                status: {
                    ...state.status,
                    create: ERROR
                }
            };
        }

        case UPDATE_USER_RESOLVED: {
            return {
                data: {
                    ...payload
                },
                status: {
                    ...state.status,
                    update: SUCCESS
                }
            };
        }

        case UPDATE_USER_PENDING: {
            return {
                status: {
                    ...state.status,
                    update: LOADING
                }
            };
        }

        case UPDATE_USER_REJECTED: {
            return {
                error: {
                    ...payload
                },
                status: {
                    ...state.status,
                    update: ERROR
                }
            };
        }

        case DELETE_USER_RESOLVED: {
            return {
                data: {
                    ...payload
                },
                status: {
                    ...state.status,
                    delete: SUCCESS
                }
            };
        }

        case DELETE_USER_PENDING: {
            return {
                status: {
                    ...state.status,
                    delete: LOADING
                }
            };
        }

        case DELETE_USER_REJECTED: {
            return {
                error: {
                    ...payload
                },
                status: {
                    ...state.status,
                    delete: ERROR
                }
            };
        }

        default: return state;
    }
};

export default userReducer;
