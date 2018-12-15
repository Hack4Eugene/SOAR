module.exports = {
    serviceHost: {
        local: 'http://localhost:3000',
        production: 'https://www.ecan-service.hnavarro-api.com'
    },
    serviceRoutes: {
        GET_ORGANIZATION_BY_ID: '/organization',

        POST_ORGANIZATION: '/organization',

        DELETE_ORGANIZATION: '/organization',

        GET_ORGANIZATIONS: '/organizations',

        /*
         * Project endpoints
         */
        GET_PROJECTS: '/projects',

        GET_PROJECT_BY_ID: '/project',

        GET_PROJECTS_BY_ORGANIZATION: '/projects/by/organization',

        POST_PROJECT: '/project',

        DELETE_PROJECT: '/project',

        GET_EVENTS_FOR_PROJECTS: '/project/events',
        /*
         * Event endpoints
         */
        GET_EVENTS: '/events',

        GET_EVENT_BY_ID: '/event',

        GET_EVENTS_BY_ID: '/events',

        POST_EVENT: '/event',

        DELETE_EVENT: '/event',

        UPDATE_EVENT: '/event',

        /*
         * User endpoints
         */
        GET_USERS: '/users',

        GET_USER_BY_ID: '/user',

        GET_USERS_BY_IDS: '/users',

        LOGIN: '/login',

        POST_USER: '/user',

        DELETE_USER: '/user'
    }
};
