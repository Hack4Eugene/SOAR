const passport = require('passport');
const routes = require('../config/routes.js');
const { getAll, getByID, createOrUpdate, deleteUser, login } = require('../services/userService');

module.exports = function (app) {
    app.get(routes.GET_USERS, passport.authenticate('jwt', { session: false }), getAll); //Applies the passport JWT strategy to the get users endpoint.

    app.get(routes.GET_USER_BY_ID, getByID);

    app.post(routes.LOGIN, login);

    app.post(routes.POST_USER, createOrUpdate);

    app.delete(routes.DELETE_USER, deleteUser);
};
