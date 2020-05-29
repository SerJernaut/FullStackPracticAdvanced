const {transporter} = require('../nodeMailer/config/nodeMailer')

module.exports = async (req, res, next) => {
    const {foundUser: {firstName, lastName, email}, foundContest: {contestType, title}, foundOffer: {id: offerId}} = req;
    try {
        const messageData = {
            to: email,
            template: 'moderatorRejecting',
            subject: 'Your offer is rejected by moderator',
            context: {
                userFullName: `${firstName} ${lastName}`,
                contestInfo: `type: ${contestType} and title: ${title}`,
                title: `${title}`
            }
        }
        const sendedMail = await transporter.sendMail(messageData)
        if(sendedMail) {
            const messageForModerator = 'You successfully rejected the offer.';
            return res.send({offerId, messageForModerator})
        }

    }
    catch (e) {
        e.code = 500
        next(e);
    }
};