const mongoose = require('mongoose');
const _ = require('lodash');
const OrganizationModel = mongoose.model('OrganizationModel');
const UserModel = mongoose.model('UserModel');
const RequestError = require('../lib/Errors');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    getAll(req, res, next) {
        return OrganizationModel.find()
            .then(organizationRecords => {
                res.status(200).send(organizationRecords);
            })
            .catch(error => {
                res.status(error.status || 500).send(error);
            });
    },

    async getByID(req, res, next) {
        try {
            const organization = await OrganizationModel
                .findById(req.params.organization_id)
                .then(organization => organization.toObject())

            const members = await UserModel.find({ _id: { $in: organization.memberIds } }, '-password')
            const orgWithMembers = _.assign(organization, { members })

            res.status(200).send(orgWithMembers)
        } catch(error) {
            console.log(error)
            res.status(error.status || 500).send(error);
        }
    },

    getMultipleByID(req, res, next) {
        OrganizationModel.find({ _id: { $in: req.params.organization_ids.split("&") } })
            .then(organizationRecord => {
                res.status(200).send(organizationRecord);
            })
            .catch(error => {
                res.status(error.status || 500).send(error);
            });
    },

    createOrUpdate(req, res, next) {
        const { organization_id: organizationId } = req.params;
        if (!organizationId) {
            const newOrganization = _.omitBy(req.body, function (key, value) {
                return key === 'userId';
            });

            newOrganization.created_at = new Date();

            OrganizationModel.create(newOrganization)
                .then(savedRecord => {
                    return UserModel.findOneAndUpdate({ _id: req.body.userId },
                        { $set: { 'organization.id': savedRecord._id, 'organization.name': savedRecord.name, 'organization.role': 'admin' } })
                        .then(userRecord => {
                            res.status(201).send(savedRecord);
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(error.status || 500).send(error);
                        });
                })
                .catch(error => {
                    res.status(error.status || 500).send(error);
                });
        } else {
            return OrganizationModel.findOne({ _id: organizationId })
                .then(organizationRecord => {
                    if (_.isEmpty(organizationRecord)) {
                        throw new RequestError(`Organization ${organizationId} not found`, 'NOT_FOUND');
                    }
                    OrganizationModel.findByIdAndUpdate(ObjectId(organizationId), req.body, { new: true })
                        .then(updatedDocument => res.status(200).send(updatedDocument))
                        .catch(err => {
                            console.log('err', err)
                            res.status(err.status || 500).send(err)
                        });
                })
                .catch(error => {
                    res.status(error.status || 500).send(error);
                });
        }
    },

    deleteOrganization(id) {
        return OrganizationModel.deleteOne({ _id: id })
            .then(() => ({ msg: 'deleted' }));
    }
};
