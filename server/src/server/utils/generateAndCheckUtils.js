const jwt = require('jsonwebtoken');
const CONSTANTS = require('../../constants');
const ApplicationError = require('../errors/ApplicationError');

module.exports.generateAccessToken = objValues => {
    const accessToken = jwt.sign(objValues, CONSTANTS.JWT_SECRET, {expiresIn: CONSTANTS.ACCESS_TOKEN_TIME});
    if (accessToken) {
        return accessToken;
    }
    throw new ApplicationError('can not sign access token');
}

