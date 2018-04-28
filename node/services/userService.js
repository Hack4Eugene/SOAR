const mongoose = require('mongoose');
const _ = require('lodash');
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
            const { password } = req.body;
            getHash(password, 16).then(hash => {
                _.assign(req.body, { password: hash });
                console.log(req.body);
                return UserModel.create(req.body)
                    .then(newUserDocument => res.status(200).send(newUserDocument))
                    .catch(error => {
                        console.log(error);
                        res.status(error.status || 500).send(error);
                    });
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