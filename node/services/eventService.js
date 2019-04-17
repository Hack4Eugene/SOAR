const mongoose = require('mongoose');
const _ = require('lodash');
const EventModel = mongoose.model('EventModel');
const ProjectModel = mongoose.model('ProjectModel');
const UserModel = mongoose.model('UserModel');
const RequestError = require('../lib/Errors');

module.exports = {
    async createOrUpdate(req, res) {
        if (!req.params.event_id) {
            const project = await ProjectModel.getById(req.body.projectId)
            const eventWithProject = { ...req.body, project };

            return EventModel.create(eventWithProject)
                .then(newEventDocument => {
                    return ProjectModel.findOneAndUpdate({ 
                        _id: req.body.projectId },
                        { $push: { eventIds: newEventDocument._id } 
                    })
                    .then(projectDocument => {
                        res.status(200).send(newEventDocument);
                    });
                })
                .catch(error => {
                    console.log('error :', error);
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
                        if (key === 'attendeeId') {
                            const attendeeIds = newEventDocument.attendeeIds;
                            const shouldRemoveAttendee = _.includes(attendeeIds, value);
                            if (shouldRemoveAttendee) return _.remove(attendeeIds, userId => { return userId === value; });
                            attendeeIds.push(value);
                        }

                        newEventDocument[key] = value;
                    });

                    return EventModel.update({ _id: req.params.event_id }, newEventDocument, { new: true });
                })
                .then(updatedEventDocument => {
                    newEventDocument = updatedEventDocument;

                    if (req.body.project) {
                        return ProjectModel.addEventId(req.body.projectId, req.params.event_id);
                    }
                })
                .then(() => { 
                    res.status(200).send(newEventDocument); 
                })
                .catch(error => {
                    res.status(error.status || 500).send(error);
                });
        }
    },

    getAll(req, res, next) {
        EventModel.find()
            .then(eventDocuments =>
                res.status(200).send(eventDocuments))
            .catch(error => {
                res.status(error.status || 500).send(error);
            });
    },

    async getByID(req, res) {
        try {
            const eventDocument = await EventModel
                .findOne({ _id: req.params.event_id })
                .exec()
                .then(res => res.toObject())

            const attendees = await UserModel.getAttendees(eventDocument.attendeeIds)
            const eventWithAttendees = { ...eventDocument, attendees }

            res.status(200).send(eventWithAttendees)
        } catch(err) {
            throw res.status(err.status || 500).send(err);
        }
    },

    async getMultipleByID(req, res) {
        try {
            const detailedEvents = await EventModel.getArrayOfEventsById(_.split(req.params.event_ids, ','))
            res.status(200).send(detailedEvents)
        } catch(err) {
            throw res.status(err.status || 500).send(err);
        }
    },

    deleteEvent(req, res, next) {
        return EventModel.remove({ _id: req.params.event_id })
            .then(res.status(204).send({ 'msg': 'deleted' }))
            .catch(error => {
                res.status(error.status || 500).send(error);
            });
    }
};
