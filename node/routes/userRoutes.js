const passport = require('passport');
const routes = require('../config/routes.js');
const { getAll, getByID, createOrUpdate, deleteUser, login } = require('../services/userService');
const { authenticate } = require('../middleware/authentication/ecan-passport-strategy');

module.exports = function (app) {
    app.get(routes.GET_USERS, authenticate, getAll); //Applies the passport JWT strategy middleware to the get users endpoint.

    app.get(routes.GET_USER_BY_ID, getByID);

    app.post(routes.LOGIN, login);

    app.post(routes.POST_USER, createOrUpdate);

    app.delete(routes.DELETE_USER, deleteUser);
};
