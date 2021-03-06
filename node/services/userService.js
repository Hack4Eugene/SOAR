const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const UserModel = mongoose.model('UserModel');
const { ObjectId } = mongoose.Types;

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
                res.status(error.status || 500).send(error);
            });
    },

    getByID: (req, res, next) => {
        UserModel.findOne({ _id: req.params.user_id })
            .then(userRecord => {
                userRecord = userRecord.toObject();
                res.status(200).send(_.omit(userRecord, 'password'));
            })
            .catch(error => {
                res.status(error.status || 500).send(error);
            });
    },

    getMultipleById: (req, res, next) => {
        const userIdArray = _.map(_.split(req.params.user_ids, ','), ObjectId);

        UserModel.find({ _id: { $in: userIdArray } })
            .then(userRecords => {
                const cleanRecords = _.map(userRecords, record => {
                    record = record.toObject();
                    return _.omit(record, 'password');
                });
                res.status(200).send(cleanRecords);
            })
            .catch(error => {
                res.status(error.status || 500).send(error);
            });
    },

    login: (req, res, next) => {
        const { email, password } = req.body;
        return UserModel.findOne({ email })
            .then(userRecord => {
                if (_.isNull(userRecord)) {
                    return res.status(404).send(new RequestError(`User with email "${email}" not found`, 'NOT_FOUND'));
                }

                userRecord = userRecord.toObject();

                const { password: hash = null } = userRecord;

                if (hash === null) {
                    return res.status(401).send(new RequestError('There was an error during authentication', 'ACCESS_DENIED'));
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

                        return res.status(401).send(new RequestError('Password is incorrect', 'ACCESS_DENIED'));
                    });
            })
            .catch(error => {
                res.status(error.status || 500).send({ msg: `User with email "${email}" not found` });
            });
    },

    postUserRole: (req, res, next) => {
        const { entity, entity_id: entityID } = req.body;
        const { user_id: userID } = req.params;

        if (!userID || !entity || !entityID) {
            return res.status(400).send({ error: 'Missing required data of user, entity, or entity_id' });
        }

        return UserModel.addRole(userID, entity, entityID)
            .then(updatedUser => {
                updatedUser = updatedUser.toObject();
                return res.status(200).send(_.omit(updatedUser, 'password'));
            })
            .catch(error => res.status(error.status || 500).send({ error }));
    },

    deleteUserRole: (req, res, next) => {
        const { role_id: roleID } = req.params;
        const { _id: userID } = req.user;

        if (!userID || !roleID) {
            return res.status(400).send({ error: 'Missing required data of user or role_id' });
        }

        return UserModel.findOneAndUpdate({ _id: userID }, { $pull: { roles: { _id: roleID } } }, { new: true })
            .then(updatedUser => {
                updatedUser = updatedUser.toObject();
                return res.status(200).send(_.omit(updatedUser, 'password'));
            })
            .catch(error => res.status(error.status || 500).send({ error }));
    },

    createOrUpdate: (req, res, next) => {
        const { email, password } = req.body;
        if (!req.params.user_id) {
            /*
             Creating a User
             */
            //Lookup the email
            UserModel
                .find({ email })
                .then(usersWithEmail => {
                    if (_.isArray(usersWithEmail) && usersWithEmail.length > 0) {
                        throw new RequestError(`Email: ${email} already exists.`, 'BAD_REQUEST');
                    }
                })
                .then(() => getHash(password, SALT_ROUNDS))
                .then(hash => Object.assign({}, req.body, { password: hash }))
                .then(userDefinedFields => Object.assign({}, userDefinedFields, { createdAt: moment() }))
                .then(newUser => UserModel.create(newUser))
                .then(newUserDocument => {
                    newUserDocument = newUserDocument.toObject();
                    return res.status(200).send(_.omit(newUserDocument, 'password'));
                })
                .catch(err => {
                    return res.status(err.status || 500).send(err);
                });
        } else {
            /*
             Updating a user
             */
            // authenticate(req, res, next, () => {
                UserModel.findOne({ _id: req.params.user_id })
                .then(userRecord => {
                        if (_.isEmpty(userRecord)) {
                            throw new RequestError(`User with email ${req.params.user_id} not found`, 'NOT_FOUND');
                        }

                        //Lookup the email for someone with a different id so you could still pass in your current email and have it not freak out
                        return UserModel.find({ email, _id: { $ne: req.params.user_id } }).count();
                    })
                    .then(userRes => {
                        if (!_.isUndefined(userRes) && _.isInteger(userRes) && userRes > 0) {
                            throw new RequestError(`Email: ${email} already exists.`, 'BAD_REQUEST');
                        }

                        const updatedRecord = req.body;
                        const userId = req.params.user_id;

                        if (!updatedRecord.password) {
                            return UserModel.findByIdAndUpdate(ObjectId(userId), updatedRecord, { new: true })
                                .then(result => {
                                    const resultObject = result.toObject();
                                    delete resultObject.password;

                                    return res.status(200).send(resultObject);
                                })
                                .catch(err => {
                                    res.status(err.status || 500).send(err)
                                });
                        }
                    })
                        //User is updating password
                    //     getHash(password, SALT_ROUNDS)
                    //         .then(hash => {
                    //             return Object.assign({}, updatedRecord, { password: hash });
                    //         })
                    //         .then(updatedRecordWithHashedPassword => {
                    //             UserModel.update({ _id: req.params.user_id }, updatedRecordWithHashedPassword)
                    //                 .then(newUserRecord => {
                    //                     newUserRecord = newUserRecord.toObject();
                    //                     res.status(200).send(_.omit(newUserRecord, 'password'));
                    //                 })
                    //                 .catch(err => {
                    //                     throw new RequestError(`Failed to update record in DB: ${err}`, 'INTERNAL_SERVICE_ERROR')
                    //                 });
                    //         })
                    //         .catch(err => {
                    //             throw new RequestError(`Failed to get password hash: ${err}`, 'INTERNAL_SERVICE_ERROR')
                    //         });
                    // })
                    .catch(error => {
                        res.status(error.status || 500).send(error);
                    });
            // });
        }
    },

    deleteUser: async (req, res, next) => {
        const { user_id: userID } = req.params;

        if (_.isNil(userID)) {
            return res.status(400).send(`Invalid user_id submitted: ${userID}`);
        }

        try {
            await UserModel.remove({ _id: ObjectId(req.params.user_id) });
            res.status(204).send({ msg: 'deleted' });
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }
};
