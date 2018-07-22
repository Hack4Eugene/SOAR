const routes = require('../config/routes.js');
const {getAll, getByID, createOrUpdate, deleteProject, getProjectsByOrganization, getEventsForProject} = require('../services/projectService');
const { authenticate } = require('../middleware/ecan-passport-strategy');

module.exports = (app) => {

    app.get(routes.GET_PROJECTS, (req, res, next) => authenticate(req, res, next, getAll));

    app.get(routes.GET_PROJECT_BY_ID, (req, res, next) => authenticate(req, res, next, getByID));

    app.get(routes.GET_PROJECTS_BY_ORGANIZATION, (req, res, next) => authenticate(req, res, next, getProjectsByOrganization));
    
    app.get(routes.GET_EVENTS_FOR_PROJECTS, (req, res, next) => authenticate(req, res, next, getEventsForProject));

    app.post(routes.POST_PROJECT, (req, res, next) => authenticate(req, res, next, createOrUpdate));

    app.delete(routes.DELETE_PROJECT, (req, res, next) => authenticate(req, res, next, deleteProject));
};
