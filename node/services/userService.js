const mongoose = require('mongoose');
const _ = require('lodash');
const Promise = require('bluebird');
const UserModel = mongoose.model('UserModel');
const RequestError = require('../lib/Errors');
const { getHash, comparePasswordHash } = require('./authService');

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
        const { username, password } = req.body;
        return UserModel.findOne({ username: username }).lean()
            .then(userRecord => {
                const { password: hash = 'INVALID' } = userRecord;
                if (_.isNull(userRecord)) {
                    throw new RequestError(`User ${username} not found`, 'NOT_FOUND');
                } else if (hash === 'INVALID') {
                    throw new RequestError('Your user was found but there was an error with your password. Please reset your password!', 'ACCESS_DENIED');
                }

                return comparePasswordHash(password, hash)
                    .then(isValidHash => {
                        console.log(isValidHash);
                        if (isValidHash) {
                            delete userRecord.password;
                            res.status(200).send(userRecord)
                        } else {
                            throw new RequestError(`Password does not match`, 'ACCESS_DENIED');
                        }
                    })
            })
            .catch(error => {
                console.log(error);
                res.status(error.status || 500).send(error);
            });
    },

    createOrUpdate: (req, res, next) => {
        if(!req.params.user_id){
            const { username, password } = req.body;
            //Lookup the username
            UserModel.find({ username }).count()
                .then(res => {
                    if (!_.isUndefined(res) && _.isInteger(res) && res > 0) {
                        throw new RequestError('Username hs been taken', 'BAD_REQUEST')
                    }
                })
                .catch(err => res.status(err.status || 500).send(err));
            getHash(password, 16).then(hash => {
                const user = Object.assign({}, req.body, { password: hash });
                UserModel.create(user)
                    .then(newUserDocument => res.status(200).send(newUserDocument))
                    .catch(error => res.status(error.status || 500).send(error));
            })
                .catch(err => {
                    res.status(500).send(err);
                });
        }
        else {
            //Todo: Check if update includes updating the password
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