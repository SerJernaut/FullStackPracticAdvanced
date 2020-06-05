const express = require('express');
const checkToken = require('../middlewares/checkToken');
const offerController = require('../controllers/offerController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');
const sendModerationResolvingEmail = require('../middlewares/sendModerationResolvingEmail');
const sendModerationRejectingEmail = require('../middlewares/sendModerationRejectingEmail');


const offersRouter = express.Router();

offersRouter.post(
    '/changeMark',
    checkToken.checkToken,
    basicMiddlewares.onlyForCustomer,
    userController.changeMark,
);

offersRouter.post(
    '/setNewOffer',
    checkToken.checkToken,
    upload.uploadLogoFiles,
    basicMiddlewares.canSendOffer,
    offerController.setNewOffer,
);

offersRouter.post(
    '/setOfferStatus',
    checkToken.checkToken,
    basicMiddlewares.onlyForCustomerWhoCreateContest,
    offerController.setOfferStatus,
);

offersRouter.post(
    '/getModerationOffers',
    checkToken.checkToken,
    basicMiddlewares.onlyForModerator,
    offerController.getOffersByFilter
)

offersRouter.post(
    '/moderationResolvingOffer',
    checkToken.checkToken,
    basicMiddlewares.onlyForModerator,
    offerController.resolveOfferByModerator,
    userController.findUserById,
    contestController.findContestById,
    sendModerationResolvingEmail
)

offersRouter.post(
    '/moderationRejectingOffer',
    checkToken.checkToken,
    basicMiddlewares.onlyForModerator,
    offerController.rejectOfferByModerator,
    userController.findUserById,
    contestController.findContestById,
    sendModerationRejectingEmail
)

module.exports = offersRouter;