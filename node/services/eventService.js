const mongoose = require('mongoose');
const _ = require('lodash');
const EventModel = mongoose.model('EventModel');
const ProjectModel = mongoose.model('ProjectModel');
const RequestError = require('../lib/Errors');

module.exports = {
    createOrUpdate(req, res) {
        if (!req.params.event_id) {
            return EventModel.create(req.body)
                .then(newEventDocument => {
                    return ProjectModel.findOneAndUpdate({ _id: req.body.project_id }, { $push: { events: newEventDocument._id } })
                        .then(projectDocument => {
                            res.status(200).send(newEventDocument);
                        });
                })
                .catch(error => {
                    console.log(error);
                    res.status(error.status || 500).send(error);
                });
        } else {
            let newEventDocument = null;
            return EventModel.findOne({ _id: req.params.event_id })
                .then(foundEventDocument => {
                    if (foundEventDocument == null) {
                        throw new RequestError(`Event ${req.params.event_id} not found`, 'NOT_FOUND');
                    }

                    newEventDocument = foundEventDocument;
                })
                .then(() => {
                    _.forEach(req.body, (value, key) => {
                        if (key === 'attendee') {
                            const attendees = newEventDocument.attendees;
                            const shouldRemoveAttendee = _.includes(attendees, value);
                            if (shouldRemoveAttendee) return _.remove(attendees, userId => { return userId === value; });
                            attendees.push(value);
                        }

                        newEventDocument[key] = value;
                    });

                    return EventModel.update({ _id: req.params.event_id }, newEventDocument, { new: true });
                })
                .then(updatedEventDocument => {
                    newEventDocument = updatedEventDocument;

                    if (req.body.project) {
                        return ProjectModel.addEventId(req.body.project, req.params.event_id);
                    }
                })
                .then(newProject => { console.log({ newProject }); })
                .then(() => { res.status(200).send(newEventDocument); })
                .catch(error => {
                    console.log(error);
                    res.status(error.status || 500).send(error);
                });
        }
    },

    getAll(req, res, next) {
        EventModel.find()
            .then(eventDocuments =>
                res.status(200).send(eventDocuments))
            .catch(error => {
                console.log(error);
                res.status(error.status || 500).send(error);
            });
    },

    getByID(req, res) {
        return EventModel.findOne({ _id: req.params.event_id })
            .then(eventDocument => res.status(200).send(eventDocument))
            .catch(error => {
                console.log(error);
                res.status(error.status || 500).send(error);
            });
    },

    deleteEvent(req, res, next) {
        return EventModel.remove({ _id: req.params.event_id })
            .then(res.status(204).send({ 'msg': 'deleted' }))
            .catch(error => {
                console.log(error);
                res.status(error.status || 500).send(error);
            });
    }
};
