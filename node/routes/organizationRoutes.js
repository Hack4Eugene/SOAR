const {getAll, getByID, createOrUpdate, deleteOrganization} = require('../services/organizationService');
const routes = require('../config/routes.js');
const { authenticate } = require('../middleware/ecan-passport-strategy');

const sendPromise = (req, res, promise) => {
    promise
    .then(data => res.status(200).send(data))
    .catch(err => res.status(err.status || 500).send(err));
};

module.exports = (app) => {
    app.get(routes.GET_ORGANIZATIONS, getAll);

    app.get(routes.GET_ORGANIZATIONS_BY_ID, authenticate, getByID);

    app.post(routes.POST_ORGANIZATION, authenticate, createOrUpdate);

    app.delete(
        routes.DELETE_ORGANIZATION,
        authenticate,
        (req, res) => sendPromise(req, res, deleteOrganization(req.params.organization_id))
    );
};
