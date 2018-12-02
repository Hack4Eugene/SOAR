const routes = require('../config/routes.js');
const { getAll, getByID, createOrUpdate, postImage, getImage, deleteProject, getProjectsByOrganization } = require('../services/projectService');
const { authenticate } = require('../middleware/ecan-passport-strategy');
const { singleImageUpload } = require('../middleware/image_upload');

module.exports = (app) => {
    app.get(routes.GET_PROJECTS, authenticate, getAll);

    app.get(routes.GET_PROJECT_BY_ID, authenticate, getByID);

    app.get(routes.GET_PROJECTS_BY_ORGANIZATION, authenticate, getProjectsByOrganization);

    app.post(routes.POST_PROJECT, authenticate, createOrUpdate);

    app.post(routes.POST_PROJECT_IMAGE, authenticate, singleImageUpload, postImage);

    app.delete(routes.DELETE_PROJECT, authenticate, deleteProject);
};
