const _ = require('lodash');
const mongoose = require('mongoose');
const ProjectModel = require('../models/projectModel');
const EventModel = require('../models/eventModel');
const OrganizationModel = require('../models/organizationModel');
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
            const project = await ProjectModel.getById(projectID);
            const eventsArray = await EventModel.getArrayOfEventsById(project.eventIds);
            
            const result = {
                ...project,
                events: _.map(eventsArray, event => event.toObject())
            };

            res.status(200).send(result);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    },

    async getMultipleById(req, res) {
        const array = _.split(req.params.project_ids, ',');
        try {
            const projects = await ProjectModel.getMultipleById(_.split(req.params.project_ids, ','))
            res.status(200).send(projects)
        } catch(err) {
            throw res.status(err.status || 500).send(err);
        }
    },

    async createOrUpdate(req, res) {
        const { project_id: projectId } = req.params;
        const organization = await OrganizationModel.getById(req.body.organizationId)
        const projectWithOrg = { ...req.body, organization }; 

        // Update Project ids on Organization
        const updateProjectIdsOnOrg = (id) => {
            if (!_.includes(organization.projectIds, id)) {
                const orgProjectIds = [ id, ...organization.projectIds ]
                
                OrganizationModel.findByIdAndUpdate(ObjectId(req.body.organizationId), { projectIds: orgProjectIds }, { new: true })
                .then(updatedDocument => {
                    res.status(200).send(updatedDocument)
                })
                .catch(err => res.status(err.status || 500).send(err));
            }
        }

        if (!projectId) {
            return ProjectModel.create(projectWithOrg)
                .then(newProjectDocument => {
                    res.status(200).send(newProjectDocument)
                    updateProjectIdsOnOrg(newProjectDocument._id)
                })
                .catch(error => {
                    res.status(error.status || 500).send(error);
                });
        }

        ProjectModel.findOne({ _id: projectId })
            .then(foundProjectDocument => {
                if (foundProjectDocument === null) {
                    throw new RequestError(`Project ${projectId} not found`, 'NOT_FOUND');
                }
                
                ProjectModel.findByIdAndUpdate(projectId, projectWithOrg, { new: true })
                    .then(updatedDocument => {
                        res.status(200).send(updatedDocument)
                        updateProjectIdsOnOrg(projectId)
                    })
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
