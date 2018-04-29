const passport = require('passport');
const ObjectId = require('mongodb').ObjectId;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const _ = require('lodash');
const UserModel = require('../../models/userModel');
const RequestError = require('../../lib/Errors');

//Config load jwt secret from keys file
const keys = require('../../config/keys');
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
    console.log(jwtPayload);
    //find the userID
    return UserModel.findOne(ObjectId(jwtPayload.id))
        .then(user => cb(null, user))
        .catch(err => cb(err));
});

passport.use(strategy);

const authenticate = next => {
    passport.authenticate('jwt', { session: false });
    console.log(next);
};

module.exports = { jwtOpts, authenticate };