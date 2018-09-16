const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const Schema = mongoose.Schema;
const _ = require('lodash');
const moment = require('moment');
const ProjectModel = mongoose.model('ProjectModel');
const EventModel = mongoose.model('EventModel');
const RequestError = require('../lib/Errors');

module.exports = {
    getAll(req, res) {
        return ProjectModel.find().lean()
            .then(projectDocuments => {
                //TODO: Replace the finished event logic
                res.status(200).send(projectDocuments);
            })
            .catch(error => {
                console.log(error);
                res.status(error.status || 500).send(error);
            });
    },

    getByID(req, res) {
        return ProjectModel.findOne({ _id: req.params.project_id })
            .then(projectDocument => res.status(200).send(projectDocument))
            .catch(error => {
                console.log(error);
                res.status(error.status || 500).send(error);
            });
    },

    getProjectsByOrganization(req, res) {
        return ProjectModel.find({ 'organization.id': ObjectId(req.params.organization_id) })
            .then(projectDocuments => res.status(200).send(projectDocuments))
            .catch(error => {
                console.log(error);
                res.status(error.status || 500).send(error);
            });
    },

    createOrUpdate(req, res) {
        if (!req.params.project_id) {
            ProjectModel.create(req.body)
                .then(newProjectDocument => res.status(200).send(newProjectDocument))
                .catch(error => {
                    console.log(error);
                    res.status(error.status || 500).send(error);
                });
        } else {
            ProjectModel.findOne({ _id: req.params.project_id })
                .then(foundProjectDocument => {
                    if (foundProjectDocument === null) {
                        throw new RequestError(`Project ${req.params.project_id} not found`, 'NOT_FOUND');
                    }
                    ProjectModel.findByIdAndUpdate(ObjectId(req.params.project_id), req.body, { new: true })
                        .then(updatedDocument => res.status(200).send(updatedDocument))
                        .catch(err => res.status(err.status || 500).send(err));
                })
                .catch(error => {
                    console.log(error);
                    res.status(error.status || 500).send(error);
                });
        }
    },

    deleteProject(req, res, next) {
        return ProjectModel.remove({ _id: req.params.project_id })
            .then(res.status(204).send({ msg: 'deleted' }))
            .catch(error => {
                console.log(error);
                return res.status(error.status || 500).send(error);
            });
    }
};
