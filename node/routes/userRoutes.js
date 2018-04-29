const routes = require('../config/routes.js');
const { getAll, getByID, createOrUpdate, deleteUser, login } = require('../services/userService');
const { authenticate } = require('../middleware/authentication/ecan-passport-strategy');

module.exports = function (app) {
    app.get(routes.GET_USERS, (req, res, next) => authenticate(req, res, next, getAll));

    app.get(routes.GET_USER_BY_ID, getByID);

    app.post(routes.LOGIN, login);

    app.post(routes.POST_USER, createOrUpdate);

    app.delete(routes.DELETE_USER, deleteUser);
};
