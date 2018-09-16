const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const UserModel = mongoose.model('UserModel');
const { ObjectId } = mongoose;

const { jwtOpts } = require('../middleware/ecan-passport-strategy');
const RequestError = require('../lib/Errors');
const { getHash, comparePasswordHash } = require('./authService');
const { authenticate } = require('../middleware/ecan-passport-strategy');

const SALT_ROUNDS = 10;
const TOKEN_LIFETIME = 3600;

module.exports = {
    getAll: (req, res, next, user) => {
        UserModel.find()
            .then(userRecords => {
                delete userRecords.password;
                res.status(200).send(userRecords);
            })
            .catch(error => {
                console.log(error);
                res.status(error.status || 500).send(error);
            });
    },

    getByID: (req, res, next) => {
        /*
            Route needs middleware that would parse the access token for the stored ID,
            Could potentially append to req body in middleware
         */
        UserModel.findOne({ _id: req.params.user_id })
        .then(userRecord => {
            userRecord = userRecord.toObject();
            res.status(200).send(_.omit(userRecord, 'password'));
        })
        .catch(error => {
            console.log(error);
            res.status(error.status || 500).send(error);
        });
    },

    getMultipleByIDs: (req, res, next) => {
        console.log('SERVICE req.params.user_ids', req.params.user_ids);

        const userIdArray = _.split(req.params.user_ids, ',');

        console.log('SERVICE userIdArray', userIdArray);
        console.log('UserModel', UserModel);

        UserModel.find({ _id: { $in: userIdArray } })
        .then(userRecords => {
            console.log('SERVICE userRecords', userRecords);
            const cleanRecords = _.map(userRecords, record => {
                record = record.toObject();
                return _.omit(record, 'password');
            });
            res.status(200).send(cleanRecords);
        })
        .catch(error => {
            console.log(error);
            res.status(error.status || 500).send(error);
        });
    },

    login: (req, res, next) => {
        const { username, password } = req.body;
        return UserModel.findOne({ username })
            .then(userRecord => {
                if (_.isNull(userRecord)) {
                    return res.status(404).send(new RequestError(`User ${username} not found`, 'NOT_FOUND'));
                }

                userRecord = userRecord.toObject();

                const { password: hash = null } = userRecord;

                if (hash === null) {
                    return res.status(401).send(new RequestError('There was an error authenticating these credentials', 'ACCESS_DENIED'));
                }

                //Check the password against the hash
                return comparePasswordHash(password, hash)
                    .then(isValidHash => {
                        if (isValidHash) {
                            //generate a signed json web token with their ID as the payload
                            const token = jwt.sign({ id: userRecord._id }, jwtOpts.secretOrKey, { expiresIn: TOKEN_LIFETIME }); //Expires in an hour
                            return res.status(200).send(_.assign({}, {
                                authentication: {
                                    token,
                                    expiresAt: moment.utc().add(TOKEN_LIFETIME, 'seconds')
                                }
                            }, { user: _.omit(userRecord, 'password') }));
                        }

                        return res.status(500).send(new RequestError('Password does not match', 'ACCESS_DENIED'));
                    });
            })
            .catch(error => {
                console.log(error);
                res.status(error.status || 500).send({ msg: 'No user for this usename was found in the Database' });
            });
    },

    createOrUpdate: (req, res, next) => {
        const { username, password } = req.body;
        if (!req.params.user_id) {
            /*
                Creating a User
             */
            //Lookup the username
            UserModel
                .find({ username })
                .then(usersWithUsername => {
                    if (_.isArray(usersWithUsername) && usersWithUsername.length > 0) {
                        return res.status(400).send(new RequestError(`Username: ${username} has been taken.`, 'BAD_REQUEST'));
                    }
                })
                .then(() => getHash(password, SALT_ROUNDS))
                .then(hash => Object.assign({}, req.body, { password: hash }))
                .then(userDefinedFields => Object.assign({}, userDefinedFields, { createdAt: moment() }))
                .then(newUser => UserModel.create(newUser))
                .then(newUserDocument => {
                    newUserDocument = newUserDocument.toObject();
                    res.status(200).send(_.omit(newUserDocument));
                })
                .catch(err => {
                    res.status(err.status || 500).send(err);
                });
        } else {
            /*
                Updating a user
             */
            authenticate(req, res, next, () => {
                UserModel.findOne({ _id: req.params.user_id })
                    .then(userRecord => {
                        if (_.isEmpty(userRecord)) {
                            throw new RequestError(`User ${req.params.user_id} not found`, 'NOT_FOUND');
                        }

                        const { username } = req.body;
                        //Lookup the username for someone with a different id so you could still pass in your current username and have it not freak out
                        UserModel.find({ username, _id: { $ne: req.params.user_id } }).count()
                            .then(res => {
                                if (!_.isUndefined(res) && _.isInteger(res) && res > 0) {
                                    throw new RequestError('Username has been taken', 'BAD_REQUEST');
                                }
                            })
                            .catch(err => res.status(err.status || 500).send(err));

                        const updatedRecord = req.body;
                        if (!updatedRecord.password) {
                            UserModel.update({ _id: req.params.user_id }, updatedRecord)
                                .then(result => res.status(200).send(result))
                                .catch(err => res.status(500).send(err));
                        }
                        //User is updating password
                        getHash(password, SALT_ROUNDS)
                            .then(hash => {
                                return Object.assign({}, updatedRecord, { password: hash });
                            })
                            .then(updatedRecordWithHashedPassword => {
                                UserModel.update({ _id: req.params.user_id }, updatedRecordWithHashedPassword)
                                    .then(newUserRecord => {
                                        newUserRecord = newUserRecord.toObject();
                                        res.status(200).send(_.omit(newUserRecord, 'password'));
                                    })
                                    .catch(err => {
                                        throw new RequestError(`Failed to update record in DB: ${err}`, 'INTERNAL_SERVICE_ERROR')
                                    });
                            })
                            .catch(err => {
                                throw new RequestError(`Failed to get password hash: ${err}`, 'INTERNAL_SERVICE_ERROR')
                            });
                    })
                    .catch(error => {
                        res.status(error.status || 500).send(error);
                    });
            });
        }
    },

    deleteUser: (req, res, next) => {
        UserModel.remove({ _id: ObjectId(req.params.user_id) })
            .then(res.status(204).send({ msg: 'deleted' }))
            .catch(error => {
                return res.status(error.status || 500).send(error);
            });
    }
};
