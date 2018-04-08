const routes = require('../config/routes.js');
const {getAll, getByID, createOrUpdate, deleteEvent} = require('../services/eventService');

module.exports = function (app) {
    
    app.get(routes.GET_EVENTS, getAll);

    app.get(routes.GET_EVENT_BY_ID, getByID);

    app.post(routes.POST_EVENT, createOrUpdate);

    app.delete(routes.DELETE_EVENT, deleteEvent);
};
