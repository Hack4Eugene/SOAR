const routes = require('../config/routes.js');
const {getAll, getByID, createOrUpdate, deleteProject, getProjectsByOrganization, getEventsForProject} = require('../services/projectService');

module.exports = (app) => {

    app.get(routes.GET_PROJECTS, getAll);

    app.get(routes.GET_PROJECT_BY_ID, getByID);

    app.get(routes.GET_PROJECTS_BY_ORGANIZATION, getProjectsByOrganization);
    
    app.get(routes.GET_EVENTS_FOR_PROJECTS, getEventsForProject);

    app.post(routes.POST_PROJECT, createOrUpdate);

    app.delete(routes.DELETE_PROJECT, deleteProject);
};
