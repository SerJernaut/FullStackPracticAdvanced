const jwt = require('jsonwebtoken');
const CONSTANTS = require('../../constants');

module.exports = (req, res, next) => {
    const {foundUser, newPassword} = req;
    try {
        const accessToken = jwt.sign({
            email: foundUser.email,
            newPassword
        }, CONSTANTS.JWT_SECRET, {expiresIn: CONSTANTS.ACCESS_TOKEN_TIME});
        if (accessToken) {
            req.accessToken = accessToken;
            return next();
        }
        next()
    } catch (err) {
        next(err)
    }
}