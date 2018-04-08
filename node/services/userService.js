const mongoose = require('mongoose');
const _ = require('lodash');
const UserModel = mongoose.model('UserModel');
const RequestError = require('../lib/Errors');

module.exports = {
    getAll: (req, res, next) => {
        UserModel.find()
        .then(userRecords => {
            res.status(200).send(userRecords);
        })
        .catch(error => {
            console.log(error);
            res.status(error.status || 500).send(error);
        });
    },

    getByID: (req, res, next) => {
        UserModel.findOne({ _id: req.params.user_id })
        .then(userRecord => {
            res.status(200).send(userRecord);
        })
        .catch(error => {
            console.log(error);
            res.status(error.status || 500).send(error);
        });
    },

    login: (req, res, next) => {
        return UserModel.findOne({ username: req.body.username }).lean()
            .then(userRecord => {
                if (_.isNull(userRecord)) {
                    throw new RequestError(`User ${req.body.username} not found`, 'NOT_FOUND');
                } else if (userRecord.password !== req.body.password) {
                    throw new RequestError('Unauthorized', 'ACCESS_DENIED');
                }

                delete userRecord.password;
                res.status(200).send(userRecord);
            })
            .catch(error => {
                console.log(error);
                res.status(error.status || 500).send(error);
            });
    },

    createOrUpdate: (req, res, next) => {
        if(!req.params.user_id){
            return UserModel.create(req.body)
                .then(newUserDocument => res.status(200).send(newUserDocument))
                .catch(error => {
                    console.log(error);
                    res.status(error.status || 500).send(error);
                });
        }
        else {
            console.log(`Updating user: ${req.params.user_id}`);

            return UserModel.findOne({ _id: req.params.user_id })
                .then(userRecord => {
                    if (_.isEmpty(userRecord)) {
                        throw new RequestError(`User ${req.params.user_id} not found`, 'NOT_FOUND');
                    }

                    const updatedRecord = userRecord;
                    _.forEach(req.body, function (value, key) {
                        updatedRecord[key] = value;
                    });

                    return UserModel.update({ _id:req.params.user_id}, updatedRecord)
                        .then(result => res.status(200).send(result));
                })
                .catch(error => {
                    console.log(error);
                    res.status(error.status || 500).send(error);
                });
        }
    },

    deleteUser: (req, res, next) => {
        UserModel.remove({ _id:req.params.user_id})
            .then(res.status(204).send({'msg': 'deleted'}))
            .catch(error => {
                console.log(error);
                return res.status(error.status || 500).send(error);
            });
    }
};