const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const Schema = mongoose.Schema;
const _ = require('lodash');
const moment = require('moment');
const ProjectModel = mongoose.model('ProjectModel');
const EventModel = mongoose.model('EventModel');
const RequestError = require('../lib/Errors');

module.exports = {
    getAll: (req, res) => {
        return ProjectModel.find().lean()
            .then(projectDocuments => {
                return EventModel.find().then(eventDocuments => [projectDocuments, eventDocuments]);
            })
            .then(([projectDocuments, eventDocuments]) => {
                const projectIds = _.flatMap(projectDocuments, projectDocument => {
                    return projectDocument._id;
                });

                const finishedEventsByProject = {};

                _.forEach(projectIds, projectId => {
                    finishedEventsByProject[projectId] = 0;
                });

                const now = moment();
                _.forEach(eventDocuments, eventDocument => {
                    if (now > eventDocument.eventDate) {
                        finishedEventsByProject[eventDocument.project.id] += 1;
                    }
                });

                _.forEach(projectDocuments, project => {
                    project.totalEvents = project.events.length;
                    project.numFinishedEvents = finishedEventsByProject[project._id];
                });

                res.status(200).send(projectDocuments);
            })
            .catch(error => {
                console.log(error);
                res.status(error.status || 500).send(error);
            })
    },

    getByID: (req, res) => {
        return ProjectModel.findOne({ _id: req.params.project_id })
            .then(projectDocument => res.status(200).send(projectDocument))
            .catch(error => {
                console.log(error);
                res.status(error.status || 500).send(error);
            })
    },

    getProjectsByOrganization: (req, res) => {
        return ProjectModel.find({ 'organization.id': ObjectId(req.params.organization_id) })
            .then(projectDocuments => res.status(200).send(projectDocuments))
            .catch(error => {
                console.log(error);
                res.status(error.status || 500).send(error);
            });
    },

    createOrUpdate: (req, res) => {
        if (!req.params.project_id) {
            return ProjectModel.create(req.body)
                .then(newProjectDocument => res.status(200).send(newProjectDocument))
                .catch(error => {
                    console.log(error);
                    res.status(error.status || 500).send(error);
                });
        }
        else {
            return ProjectModel.findOne({ _id: req.params.project_id })
                .then(foundProjectDocument => {
                    if (foundProjectDocument == null) {
                        throw new RequestError(`Project ${req.params.project_id} not found`, 'NOT_FOUND');
                    }
                    const updateProjectDocument = foundProjectDocument;
                    _.forEach(req.body, (value, key) => {
                        updateProjectDocument[key] = value;
                    });

                    return ProjectModel.update({ _id: req.params.project_id }, updateProjectDocument)
                        .then(result => {
                            res.status(200).send(result);
                        })
                })
                .catch(error => {
                    console.log(error);
                    res.status(error.status || 500).send(error);
                });
        }
    },

    deleteProject: (req, res, next) => {
        return ProjectModel.remove({ _id: req.params.project_id })
            .then(res.status(204).send({ 'msg': 'deleted' }))
            .catch(error => {
                console.log(error);
                return res.status(error.status || 500).send(error);
            });
    },

    getEventsForProject: (req, res, next) => {
        return ProjectModel.findOne({ _id: req.params.project_id })
            .then(projectDocument => {
                return Promise.all(projectDocument.events.map(event_id => {
                    return EventModel.findById(event_id)
                        .then(eventDocument => {
                            return eventDocument
                        })
                }))
                .then(newEventDocuments => res.status(200).send(newEventDocuments))
            })
            .catch(error => {
                console.log(error);
                return res.status(error.status || 500).send(error);
            });
    }
}