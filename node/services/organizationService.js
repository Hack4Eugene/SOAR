const mongoose = require('mongoose');
const _ = require('lodash');
const OrganizationModel = mongoose.model('OrganizationModel');
const UserModel = mongoose.model('UserModel');
const RequestError = require('../lib/Errors');

const { ObjectId } = mongoose;

module.exports = {
    getAll: (req, res, next) => {
        return OrganizationModel.find()
            .then(organizationRecords => {
                res.status(200).send(organizationRecords);
            })
            .catch(error => {
                console.log(error);
                res.status(error.status || 500).send(error);
            });
    },

    getByID: (req, res, next) => {
        OrganizationModel.findOne({ _id: req.params.organization_id })
            .then(organizationRecord => {
                res.status(200).send(organizationRecord);
            })
            .catch(error => {
                console.log(error);
                res.status(error.status || 500).send(error);
            });
    },

    createOrUpdate: (req, res, next) => {
        if (!req.params.organization_id) {
            const newOrganization = _.omitBy(req.body, function (key, value) {
                return key === 'userId';
            });

            return OrganizationModel.create(newOrganization)
                .then(savedRecord => {
                    return UserModel.findOneAndUpdate({ _id: req.body.userId }, { $set: { 'organization.id': savedRecord._id, 'organization.name': savedRecord.name, 'organization.role': 'admin' }})
                        .then(userRecord => {
                            res.status(201).send(savedRecord);
                        });
                })
                .catch(error => {
                    console.log(error);
                    res.status(error.status || 500).send(error);
                });
        } else {
            console.log(`Updating organization: ${req.params.organization_id}`);


            return OrganizationModel.findOne({ _id: req.params.organization_id })
                .then(organizationRecord => {
                    if (_.isEmpty(organizationRecord)) {
                        throw new RequestError(`Organization ${req.params.organization_id} not found`, 'NOT_FOUND');
                    }

                    const updatedRecord = organizationRecord;
                    _.forEach(req.body, function (value, key) {
                        updatedRecord[key] = value;
                    });

                    return OrganizationModel.update({ _id: ObjectId(req.params.organization_id) }, updatedRecord)
                        .then(result => res.status(200).send(result));
                })
                .catch(error => {
                    console.log(error);
                    res.status(error.status || 500).send(error);
                });
        }

        return OrganizationModel.create(req.body)
            .then(savedRecord => {
                res.status(201).send(savedRecord);
            })
            .catch(error => {
                console.log(error);
                res.status(error.status || 500).send(error);
            });
    },

    deleteOrganization: (id) => {
        return OrganizationModel.deleteOne({ _id: id })
            .then(() => ({ 'msg': 'deleted' }));
    }
};