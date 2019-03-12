module.exports = {
    serviceHost: {
        local: 'http://localhost:3000',
        production: 'https://www.ecan-service.hnavarro-api.com'
    },
    serviceRoutes: {
        /*
         * Organization endpoints
         */
        GET_ORGANIZATION_BY_ID: '/organization',

        GET_ORGANIZATIONS_BY_ID: '/organization',

        POST_ORGANIZATION: '/organization',

        DELETE_ORGANIZATION: '/organization',

        GET_ORGANIZATIONS: '/organizations',

        UPDATE_ORGANIZATION: '/organization',

        GET_ORG_PROJECTS_BY_ID: '/organization/projectIds',

        /*
         * Project endpoints
         */
        GET_PROJECTS: '/projects',

        GET_PROJECT_BY_ID: '/project',
        
        GET_PROJECT_BY_ID: '/project',

        // GET_PROJECTS_BY_ORGANIZATION: '/projects/by/organization',

        POST_PROJECT: '/project',

        UPDATE_PROJECT: '/project',

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
        
        UPDATE_USER: '/user',

        DELETE_USER: '/user'
    }
};
