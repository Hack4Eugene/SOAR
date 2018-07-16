const routes = require('../config/routes.js');
const { getAll, getByID, createOrUpdate, deleteUser, login } = require('../services/userService');
const { authenticate } = require('../middleware/ecan-passport-strategy');

module.exports = function (app) {
    app.get(routes.GET_USERS, (req, res, next) => authenticate(req, res, next, getAll));

    app.get(routes.GET_USER_BY_ID, (req, res, next) => authenticate(req, res, next, getByID));

    app.post(routes.LOGIN, login);

    app.post(routes.POST_USER, (req, res, next) => authenticate(req, res, next, createOrUpdate));

    app.delete(routes.DELETE_USER, (req, res, next) => authenticate(req, res, next, deleteUser));
    /*
        Todo: I think a helpful route would be a route that returns a users roles.
    */
};
