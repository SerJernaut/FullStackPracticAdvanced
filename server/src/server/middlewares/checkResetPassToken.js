const jwt = require('jsonwebtoken');
const CONSTANTS = require('../../constants');
const TokenError = require('../errors/TokenError')

module.exports = async (req, res, next) => {
    try {
        const {accessToken} = req.body;
        if (accessToken) {
            req.tokenData = jwt.verify(accessToken, CONSTANTS.JWT_SECRET);
            return next()
        }
        next(new TokenError('need token'));
    } catch (err) {
        next(new TokenError());
    }
};
