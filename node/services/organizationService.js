const mongoose = require('mongoose');
const _ = require('lodash');
const OrganizationModel = mongoose.model('OrganizationModel');
const UserModel = mongoose.model('UserModel');
const RequestError = require('../lib/Errors');

const { ObjectId } = mongoose;

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

    getByID(req, res, next) {
        OrganizationModel.find({ _id: { $in: req.params.organization_ids.split("&") } })
            .then(organizationRecord => {
                res.status(200).send(organizationRecord);
            })
            .catch(error => {
                res.status(error.status || 500).send(error);
            });
    },

    createOrUpdate(req, res, next) {
        const { organizationID } = req.params.organization_id;
        if (!organizationID) {
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
            return OrganizationModel.findOne({ _id: organizationID })
                .then(organizationRecord => {
                    if (_.isEmpty(organizationRecord)) {
                        throw new RequestError(`Organization ${organizationID} not found`, 'NOT_FOUND');
                    }

                    const updatedRecord = organizationRecord;
                    _.forEach(req.body, function (value, key) {
                        updatedRecord[key] = value;
                    });

                    return OrganizationModel.update({ _id: organizationID }, updatedRecord)
                        .then(result => res.status(200).send(result));
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
