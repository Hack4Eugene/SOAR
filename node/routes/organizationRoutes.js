const {getAll, getByID, createOrUpdate, deleteOrganization} = require('../services/organizationService');
const routes = require('../config/routes.js');

const sendPromise = (req, res, promise) => {
    promise
    .then(data => res.status(200).send(data))
    .catch(err => res.status(err.status || 500).send(err));
}

module.exports = (app) => {
    
    app.get(routes.GET_ORGANIZATIONS, getAll);

    app.get(routes.GET_ORGANIZATION_BY_ID, getByID);

    app.post(routes.POST_ORGANIZATION, createOrUpdate);

    app.delete(
        routes.DELETE_ORGANIZATION,
        (req, res) => sendPromise(req, res, deleteOrganization(req.params.organization_id))
    );
};
