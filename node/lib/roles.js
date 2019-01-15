const _ = require('lodash');
const RequestError = require('./Errors');

const roleValidation = async (req, res, next) => {
    let requestArray = req.url.split('/');
    requestArray = _.pullAll(requestArray, ['']);

    if (requestArray.length !== 2) {
        return next();
    }

    const requestEntity = requestArray[0];
    const requestID = requestArray[1];

    let hasAccess = false;
    _.forEach(req.user.roles, role => {
        const { entity, entity_id: entityID } = role;
        if (entity === 'site' && entityID === '*') {
            hasAccess = true;
        } else if (entity === requestEntity && entityID === requestID) {
            hasAccess = true;
        }
    });

    if (!hasAccess) {
        const response = {
            error: 'UNAUTHORIZED',
            message: 'No access to resource'
        };
        return res.status(401).send(new RequestError(response, 'ACCESS_DENIED'));
    }
    next();
};

const addRolePermission = async (req, res, next) => {
    const { roles } = req.user;
    const { entity: newRoleEntity, entity_id: newRoleEntityID } = req.body;

    let hasAccess = false;
    _.forEach(roles, role => {
        const { entity, entity_id: entityID } = role;
        if (entity === 'site' && entityID === '*') {
            hasAccess = true;
        } else if (entity === newRoleEntity && entityID === newRoleEntityID) {
            hasAccess = true;
        }
    });

    if (!hasAccess) {
        const response = {
            error: 'UNAUTHORIZED',
            message: 'No access to resource'
        };
        return res.status(401).send(new RequestError(response, 'ACCESS_DENIED'));
    }
    next();
};

module.exports = {
    checkForRole: (roles, requestEntity, requestID) => {
        let hasAccess = false;

        _.forEach(roles, role => {
            const { entity, entity_id: entityID } = role;
            if (entity === 'site' && entityID === '*') {
                hasAccess = true;
            } else if (entity === requestEntity && entityID === requestID) {
                hasAccess = true;
            }
        });

        return hasAccess;
    },

    roleValidation,

    addRolePermission
};
