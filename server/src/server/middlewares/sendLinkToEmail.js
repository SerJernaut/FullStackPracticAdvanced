const {transporter} = require('../nodeMailer/config/nodeMailer')

module.exports = async (req, res, next) => {
    const {foundUser: {firstName, lastName, email}, accessToken} = req;
   try {
       const messageData = {
           to: email,
           template: 'resetPassword',
           subject: 'Forgot password?',
           context: {
               url: `http://localhost:3000/confirm_reset_password/${accessToken}`,
               name: `${firstName} ${lastName}`
           },

       }

       const sendedMail = await transporter.sendMail(messageData)
       if(sendedMail) {
           return res.send('Resetting password link sended to your email.')
       }

   }
   catch (e) {
        e.code = 500
        next(e);
   }
};