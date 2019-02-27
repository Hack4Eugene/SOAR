const routes = require('../config/routes.js');
const { getAll, getByID, getMultipleById, createOrUpdate, deleteProject } = require('../services/projectService');
const { authenticate } = require('../middleware/ecan-passport-strategy');
const { roleValidation } = require('../lib/roles');

module.exports = (app) => {
    app.get(routes.GET_PROJECTS, authenticate, getAll);

    app.get(routes.GET_PROJECT_BY_ID, authenticate, getByID);

    app.get(routes.GET_ORG_PROJECTS_BY_ID, authenticate, getMultipleById);
    
    app.post(routes.POST_PROJECT, authenticate, /*roleValidation,*/ createOrUpdate);

    app.delete(routes.DELETE_PROJECT, authenticate, deleteProject);
};
