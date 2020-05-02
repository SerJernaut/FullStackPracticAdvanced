const ApplicationError = require('./ApplicationError');

class PasswordAffiliationError extends ApplicationError{
    constructor (message) {
        super(message || 'This password already belongs to this email', 409);
    }
}

module.exports = PasswordAffiliationError;