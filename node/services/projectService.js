const _ = require('lodash');
const ProjectModel = require('../models/projectModel');
const EventModel = require('../models/eventModel');
const ObjectId = require('mongodb').ObjectId;
const RequestError = require('../lib/Errors');

module.exports = {
    getAll(req, res) {
        return ProjectModel.find().lean()
            .then(projectDocuments => {
                //TODO: Replace the finished event logic
                res.status(200).send(projectDocuments);
            })
            .catch(error => {
                res.status(error.status || 500).send(error);
            });
    },

    async getByID(req, res) {
        const { project_id: projectID } = req.params;
        if (_.isNil(projectID)) {
            return res.status(400).send(`Invalid project ID submitted: ${projectID}`);
        }

        try {
            const project = await ProjectModel.getById(projectID).exec();
            const eventArray = await EventModel.getArrayOfEventsById(project.events);
            const result = {
                ...project.toObject(),
                eventRecords: _.map(eventArray, event => event.toObject())
            };

            res.status(200).send(result);
        } catch (err) {
            throw res.status(err.status || 500).send(err);
        }
    },

    getProjectsByOrganization(req, res) {
        return ProjectModel.find({ 'organization.id': ObjectId(req.params.organization_id) })
            .then(projectDocuments => res.status(200).send(projectDocuments))
            .catch(error => {
                res.status(error.status || 500).send(error);
            });
    },

    createOrUpdate(req, res) {
        const { project_id: projectID } = req.params;

        if (!projectID) {
            return ProjectModel.create(req.body)
                .then(newProjectDocument => res.status(200).send(newProjectDocument))
                .catch(error => {
                    res.status(error.status || 500).send(error);
                });
        }

        ProjectModel.findOne({ _id: projectID })
            .then(foundProjectDocument => {
                if (foundProjectDocument === null) {
                    throw new RequestError(`Project ${projectID} not found`, 'NOT_FOUND');
                }

                ProjectModel.findByIdAndUpdate(ObjectId(projectID), req.body, { new: true })
                    .then(updatedDocument => res.status(200).send(updatedDocument))
                    .catch(err => res.status(err.status || 500).send(err));
            })
            .catch(error => {
                console.log(error);
                res.status(error.status || 500).send(error);
            });
    },

    deleteProject(req, res, next) {
        return ProjectModel.remove({ _id: req.params.project_id })
            .then(res.status(204).send({ msg: 'deleted' }))
            .catch(error => {
                return res.status(error.status || 500).send(error);
            });
    }
};
