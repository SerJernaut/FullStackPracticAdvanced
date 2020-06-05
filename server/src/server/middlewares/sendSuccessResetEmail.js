const {transporter} = require('../nodeMailer/config/nodeMailer')

module.exports = async (req, res, next) => {
    try {
        const {updatedUser: {firstName, lastName, email}} = req;
        const messageData = {
            to: email,
            template: 'passwordResetSuccess',
            subject: 'Successful resetted password',
            context: {
                name: `${firstName} ${lastName}`
            },
        }
        const sendedMail = await transporter.sendMail(messageData)
        if(sendedMail) {
            return res.send('Your password was resetted. You can login with your new password.');
        }

    }
    catch (e) {
        e.code = 500
        next(e);
    }
};