const routes = require('../config/routes.js');
const {getAll, getByID, createOrUpdate, deleteUser, login} = require('../services/userService');

module.exports = function (app) {

    app.get(routes.GET_USERS, getAll);

    app.get(routes.GET_USER_BY_ID, getByID);

    app.post(routes.LOGIN, login);

    app.post(routes.POST_USER, createOrUpdate);

    app.delete(routes.DELETE_USER, deleteUser);
};
