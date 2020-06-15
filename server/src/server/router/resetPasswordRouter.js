const express = require('express');
const hashNewPassword = require('../middlewares/hashNewPassword');
const sendLinkToEmail = require('../middlewares/sendLinkToEmail')
const validators = require('../middlewares/validators');
const userController = require('../controllers/userController');
const checkResetPasswordToken = require('../middlewares/checkResetPassToken')
const sendSuccessResetEmail = require('../middlewares/sendSuccessResetEmail');

const resetPasswordRouter = express.Router();

resetPasswordRouter.post(
    '/send_email_for_reset_password',
    validators.validateResettingPasswordData,
    userController.findUserByEmail,
    userController.checkIfPasswordsAreNotEquals,
    hashNewPassword,
    userController.generateAccessTokenForNewPassword,
    sendLinkToEmail
);

resetPasswordRouter.post('/confirm_reset_password',
    checkResetPasswordToken,
    userController.findUserByEmail,
    userController.checkIfPasswordsAreNotEquals,
    userController.updateUserByAccessToken,
    sendSuccessResetEmail
)

module.exports = resetPasswordRouter;