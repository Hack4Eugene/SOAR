const _ = require('lodash');

const endpoints = {
    /*
     * Organization endpoints
     */
    GET_ORGANIZATIONS_BY_ID: '/organization/:organization_ids',

    POST_ORGANIZATION: '/organization/:organization_id?',

    DELETE_ORGANIZATION: '/organization/:organization_id',

    GET_ORGANIZATIONS: '/organizations',

    /*
     * Project endpoints
     */
    GET_PROJECTS: '/projects',

    GET_PROJECT_BY_ID: '/project/:project_id',

    GET_PROJECTS_BY_ORGANIZATION: '/projects/by/organization/:organization_id',

    POST_PROJECT: '/project/:project_id?',

    DELETE_PROJECT: '/project/:project_id',

    GET_EVENTS_FOR_PROJECTS: '/project/:project_id/events',
    /*
     * Event endpoints
     */
    GET_EVENTS: '/events',

    GET_EVENT_BY_ID: '/event/:event_id',

    POST_EVENT: '/event/:event_id?',

    DELETE_EVENT: '/event/:event_id',

    UPDATE_EVENT: '/event/:event_id',

    /*
     * User endpoints
     */
    GET_USERS: '/users',

    GET_USER_BY_ID: '/user/:user_id',

    GET_USERS_BY_IDS: '/users/:user_ids',

    LOGIN: '/login',

    POST_USER: '/user/:user_id?',

    DELETE_USER: '/user/:user_id',

    CREATE_USER_ROLE: '/user/:user_id/role',

    DELETE_USER_ROLE: '/user/:user_id/role/:role_id'
};

module.exports = _.mapValues(endpoints, 
    endpointURL => `${endpointURL}`
);