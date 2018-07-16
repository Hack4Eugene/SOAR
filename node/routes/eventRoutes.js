const routes = require('../config/routes.js');
const {getAll, getByID, createOrUpdate, deleteEvent} = require('../services/eventService');
const { authenticate } = require('../middleware/ecan-passport-strategy');

module.exports = function (app) {
    app.get(routes.GET_EVENTS, (req, res, next) => authenticate(req, res, next, getAll));

    app.get(routes.GET_EVENT_BY_ID, (req, res, next) => authenticate(req, res, next, getByID));

    app.post(routes.POST_EVENT, (req, res, next) => authenticate(req, res, next, createOrUpdate));

    app.delete(routes.DELETE_EVENT, (req, res, next) => authenticate(req, res, next, deleteEvent));
};
