import _ from 'lodash';
import moment from 'moment';

import {
    SET_EVENTS_FINISHED,
    INCREMENT_EVENT_FINISH,
    ADD_EVENT_RESOLVED,
    ADD_EVENT_REJECTED,
    GET_EVENTS_RESOLVED,
    GET_EVENTS_REJECTED,
    ADD_ORG_RESOLVED,
    ADD_ORG_REJECTED,
    LOGIN_USER_RESOLVED,
    LOGIN_USER_REJECTED
} from '../types';

const initialState = {
    user: {},
    events: [],
    // events: [
        // { 
        //     id: 'tuv789',
        //     name: 'After School Food Drive',
        //     date: 1523732368,
        //     description: 'Meet after school to donate your canned food!',
        //     project: 'Fall Food Initiative',
        //     location: 'University of Oregon',
        //     owner: 'FOOD for Lane County', // organization
        //     tags: ['food', 'homeless', 'fall']
        // },
        // { 
        //     id: 'xyz910',
        //     name: 'Saturday Market Ice Breaker Meeting',
        //     date: 1525132368,
        //     description: 'Our first meeting of the Winter Warmth Project!',
        //     project: 'Winter Warmth Project',
        //     location: 'Saturday Market',
        //     owner: 'White Bird Clinic', // organization
        //     tags: ['clothing', 'homeless', 'winter']
        // }
    // ],
    projects: [
        // {
        //     id: 'abcd123',
        //     title: 'Winter Warmth Project',
        //     startDate: 1523732368,
        //     numFinishedEvents: 12,
        //     totalEvents: 30,
        //     description: "Keep our friends without addresses warm this winter!",
        //     animationVal: 0
        // },
        // {
        //     id: 'efg456',
        //     title: 'Fall Food Initiative',
        //     startDate: 1523732368,
        //     numFinishedEvents: 4,
        //     totalEvents: 22,
        //     description: "Spread the love (and food) around town!",
        //     animationVal: 0
        // }
    ]
};

const reducer = (state = initialState, action) => {
    const { type, payload = { message: '' } } = action;

    switch(type) {
        case SET_EVENTS_FINISHED: {
            return _.assign(...state, { events: { ...state.events, numFinishedEvents: payload } })
        }

        case INCREMENT_EVENT_FINISH: {
            return _.assign(...state, { events: { ...state.events, animationVal: payload } })
        }

        case ADD_EVENT_RESOLVED: {
            return _.assign(...state, { events: [ ...state.events, payload ] })
        }

        case ADD_ORG_RESOLVED: {
            return _.assign(...state, { organizations: [ ...state.organizations, payload ] })
        }

        case GET_EVENTS_RESOLVED: {
            console.log(payload.data)
            return _.assign(...state, {events: [ ...state.events, payload.data ] })
        }

        case LOGIN_USER_RESOLVED: {
            return _.assign(...state, { user: [ ...state.user, payload ] })
        }

        case LOGIN_USER_REJECTED: {
            return _.assign(...state, { events: [ ...state.events, payload ] })
        }

        default: return state;
    }
};

export default reducer