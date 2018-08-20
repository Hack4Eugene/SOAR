const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { jwtOpts } = require('../middleware/ecan-passport-strategy');
const UserModel = mongoose.model('UserModel');
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
            delete userRecords.password;
            res.status(200).send(userRecord);
        })
        .catch(error => {
            console.log(error);
            res.status(error.status || 500).send(error);
        });
    },

    login: (req, res, next) => {
        const { username, password } = req.body;
        return UserModel.findOne({ username }).lean()
            .then(userRecord => {
                const { password: hash = null } = userRecord;
                if (_.isNull(userRecord)) {
                    throw new RequestError(`User ${username} not found`, 'NOT_FOUND');
                } else if (hash === null) {
                    throw new RequestError('Your user was found but there was an error with your password. Please reset your password!', 'ACCESS_DENIED');
                }
                //Check the password against the hash
                return comparePasswordHash(password, hash)
                    .then(isValidHash => {
                        if (isValidHash) {
                            delete userRecord.password;
                            //generate a signed json web token with their ID as the payload
                            const token = jwt.sign({ id: userRecord._id }, jwtOpts.secretOrKey, { expiresIn: TOKEN_LIFETIME }); //Expires in an hour
                            return res.status(200).send(_.assign({}, { authentication: { token, expiresAt: moment.utc().add(TOKEN_LIFETIME, 'seconds') } }, { user: userRecord }));
                        } else {
                            throw new RequestError(`Password does not match`, 'ACCESS_DENIED');
                        }
                    })
            })
            .catch(error => {
                console.log(error);
                res.status(error.status || 500).send(error, { msg: 'No user for this usename was found in the Database' });
            });
    },

    createOrUpdate: (req, res, next) => {
        const { username, password } = req.body;
        if(!req.params.user_id){
            /*
                Creating a User
             */
            //Lookup the username
            UserModel.find({ username }).count()
                .then(res => {
                    if (!_.isUndefined(res) && _.isInteger(res) && res > 0) {
                        throw new RequestError('Username hs been taken', 'BAD_REQUEST')
                    }
                })
                .catch(err => res.status(err.status || 500).send(err));
            //Get Password Hash
            getHash(password, SALT_ROUNDS)
                .then(hash => {
                    return Object.assign({}, req.body, { password: hash });
                })
                .then(userDefinedFields => Object.assign({}, userDefinedFields, { createdAt: moment() }))
                .then(newUser => {
                    UserModel.create(newUser)
                        .then(newUserDocument => {
                            delete userRecords.password;
                            res.status(200).send(newUserDocument)
                        })
                        .catch(error => res.status(error.status || 500).send(error))
                    }
                )
                .catch(err => {
                    res.status(500).send(err);
                });
        }
        else {
            /*
                Updating a user
             */
            authenticate(req, res, next, () => {
                console.log(`Updating user: ${req.params.user_id}`);

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
                                    throw new RequestError('Username has been taken', 'BAD_REQUEST')
                                }
                            })
                            .catch(err => res.status(err.status || 500).send(err));

                        let updatedRecord = req.body;

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
                                    .then(result => {
                                        delete result.password;
                                        res.status(200).send(result)
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
        UserModel.remove({ _id:req.params.user_id})
            .then(res.status(204).send({'msg': 'deleted'}))
            .catch(error => {
                return res.status(error.status || 500).send(error);
            });
    }
};