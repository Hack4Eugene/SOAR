import { ERROR, NOT_STARTED, SUCCESS } from '../statusTypes';
import {
    CREATE_EVENT_RESOLVED, CREATE_EVENT_REJECTED,
    DELETE_EVENT_REJECTED, DELETE_EVENT_RESOLVED,
    GET_EVENTS_REJECTED, GET_EVENTS_RESOLVED,
    GET_EVENT_REJECTED, GET_EVENT_RESOLVED,
    INCREMENT_EVENT_FINISH, SET_EVENTS_FINISHED,
    UPDATE_EVENT_RESOLVED, UPDATE_EVENT_REJECTED
} from '../types';

const initialState = {
    data: {},
    status: NOT_STARTED,
    selectedEvent: {
        data: {},
        status: {
            get: NOT_STARTED,
            create: NOT_STARTED,
            update: NOT_STARTED
        }
    }
};

const eventReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_EVENTS_FINISHED: {
            return {
                ...state,
                numFinishedEvents: payload
            };
        }

        case INCREMENT_EVENT_FINISH: {
            return { ...state, animationVal: payload };
        }

        case CREATE_EVENT_RESOLVED: {
            return { 
                ...state,
                selectedEvent: {
                    data: payload,
                    status: { create: SUCCESS }
                }
            };
        }

        case CREATE_EVENT_REJECTED: {
            return { 
                ...state,
                selectedEvent: {
                    error: payload,
                    status: { create: ERROR }
                }
            };
        }

        case GET_EVENT_RESOLVED: {
            return { 
                ...state, 
                selectedEvent: { 
                    data: payload, 
                    status: { get: SUCCESS }
                } 
            };
        }

        case GET_EVENT_REJECTED: {
            return { 
                ...state, 
                selectedEvent: { 
                    error: payload, 
                    status: { get: ERROR } 
                } 
            };
        }

        case UPDATE_EVENT_RESOLVED: {
            return {
                ...state,
                selectedEvent: {
                    data: payload,
                    status: { update: SUCCESS }
                }
            };
        }

        case UPDATE_EVENT_REJECTED: {
            return {
                ...state,
                selectedEvent: {
                    error: payload,
                    status: { update: ERROR }
                }
            };
        }

        case DELETE_EVENT_RESOLVED: {
            return { ...state, status: SUCCESS };
        }

        case DELETE_EVENT_REJECTED: {
            return { 
                ...state, 
                error: payload, 
                status: ERROR 
            };
        }

        case GET_EVENTS_RESOLVED: {
            return { 
                ...state, 
                data: payload.data, 
                status: SUCCESS 
            };
        }

        case GET_EVENTS_REJECTED: {
            return { 
                ...state, 
                error: payload.data, 
                status: ERROR 
            };
        }

        default: return state;
    }
};

export default eventReducer;
