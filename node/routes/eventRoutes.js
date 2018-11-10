const routes = require('../config/routes.js');
const {getAll, getByID, getMultipleByID, createOrUpdate, deleteEvent} = require('../services/eventService');
const { authenticate } = require('../middleware/ecan-passport-strategy');

module.exports = function (app) {
    app.get(routes.GET_EVENTS, authenticate, getAll);

    app.get(routes.GET_EVENTS_BY_ID, authenticate, getMultipleByID);

    app.get(routes.GET_EVENT_BY_ID, authenticate, getByID);

    app.post(routes.POST_EVENT, authenticate, createOrUpdate);

    app.delete(routes.DELETE_EVENT, authenticate, deleteEvent);
};
