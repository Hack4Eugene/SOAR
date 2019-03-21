const routes = require('../config/routes.js');
const { getAll, getByID, getMultipleById, createOrUpdate, deleteUser, login, postUserRole, deleteUserRole } = require('../services/userService');
const { authenticate } = require('../middleware/ecan-passport-strategy');
const { addRolePermission } = require('../lib/roles');

module.exports = function (app) {
    app.get(routes.GET_USERS, authenticate, getAll);

    app.get(routes.GET_USER_BY_ID, authenticate, getByID);

    app.get(routes.GET_USERS_BY_IDS, authenticate, getMultipleById);

    app.post(routes.LOGIN, login);

    app.post(routes.POST_USER, createOrUpdate);

    app.post(routes.UPDATE_USER, createOrUpdate);

    app.post(routes.CREATE_USER_ROLE, authenticate, addRolePermission, postUserRole);

    app.delete(routes.DELETE_USER_ROLE, authenticate, deleteUserRole);

    app.delete(routes.DELETE_USER, authenticate, deleteUser);
    /*
        Todo: I think a helpful route would be a route that returns a users roles.
    */
};
