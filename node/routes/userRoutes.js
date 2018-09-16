const routes = require('../config/routes.js');
const { getAll, getByID, getMultipleByIDs, createOrUpdate, deleteUser, login } = require('../services/userService');
const { authenticate } = require('../middleware/ecan-passport-strategy');

module.exports = function (app) {
    app.get(routes.GET_USERS, authenticate, getAll);

    app.get(routes.GET_USER_BY_ID, authenticate, getByID);

    app.get(routes.GET_USERS_BY_IDS, authenticate, getMultipleByIDs);

    app.post(routes.LOGIN, login);

    app.post(routes.POST_USER, createOrUpdate);

    app.delete(routes.DELETE_USER, authenticate, deleteUser);
    /*
        Todo: I think a helpful route would be a route that returns a users roles.
    */
};
