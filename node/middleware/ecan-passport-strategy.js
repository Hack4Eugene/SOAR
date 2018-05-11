const passport = require('passport');
const ObjectId = require('mongodb').ObjectId;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const _ = require('lodash');
const UserModel = require('../models/userModel');
const RequestError = require('../lib/Errors');

//Config load jwt secret from keys file
const keys = require('../config/keys');
//Check config file for jwt secret, throw error if not found
if (!_.get(keys, 'jwt.secretOrKey', false)) {
    throw new RequestError(`Keys file with jwt secret is required`, 'NOT_FOUND');
}
//Set jwt opts, note - expects token in Authorization header as bearer token
const jwtOpts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : keys.jwt.secretOrKey
};
/*
    This is the middleware strategy.
    It essentially just extracts the token from the header,
    parses the token payload for a userID,
    if it finds the user, executes node-style call back with null err and the userObj
 */
const strategy = new JWTStrategy(jwtOpts, function (jwtPayload, cb) {
    //find the userID
    return UserModel.findOne(ObjectId(jwtPayload.id))
        .then(user => cb(null, user))
        .catch(err => cb(err));
});

//Tell Passport what middleware to apply to passport authenticate method
passport.use(strategy);

//Custom middleware to process the request as I see fit. Keep authentication similar throughout;
const authenticate = (req, res, next, routeMethod) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        //If reason is empty, probably nothing to do with validation. Typically lack of something to validate AKA missing access token
        if (_.isEmpty(info) && !user) {
            const response = {
                error: err,
                user,
                info,
                message: 'You may have forgotten an access token'
            };

            throw new RequestError(JSON.stringify(response), 'BAD_REQUEST');
        }
        //If reason is defined its likely to be an expired token.
        if (!user && info) {
            const response = {
                error: err,
                user,
                info,
                messsgage: 'Access Token is probably Expired'
            };

            return res.status(401).send(JSON.stringify(response))
        }
        //User authenticated! Call next function in execution.
        routeMethod(req, res, next);
    })(req, res, next, routeMethod);
};


module.exports = { jwtOpts, authenticate };