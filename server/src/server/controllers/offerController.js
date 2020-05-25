import moment from "moment";
const ServerError = require("../errors/ServerError");
const db = require('../models/index');
const offerQueries = require('./queries/offerQueries');
const userQueries = require('./queries/userQueries');
const contestQueries = require('./queries/contestQueries');
const controller = require('../../socketInit');
const CONSTANTS = require('../../constants');

module.exports.getOffersByFilter = async (req, res, next) => {
    try{
        const {from} = req.body;
        const filter = {
            where: {
                fileName: {
                    [db.Sequelize.Op.not]: null,
                },
            },
            attributes: ['fileName']
        };
        if (from) {
            filter.where.createdAt = {
                [db.Sequelize.Op.gte]: moment(from).format()
            }
        }
        const result = await offerQueries.getAllOffers(filter);
        return res.send(result);
    }
    catch (e) {
        next(e);
    }
}

module.exports.setNewOffer = async (req, res, next) => {
    const obj = {};
    if (req.body.contestType === CONSTANTS.LOGO_CONTEST) {
        obj.fileName = req.file.filename;
        obj.originalFileName = req.file.originalname;
    } else {
        obj.text = req.body.offerData;
    }
    obj.userId = req.tokenData.userId;
    obj.contestId = req.body.contestId;
    try {
        let result = await offerQueries.createOffer(obj);
        delete result.contestId;
        delete result.userId;
        controller.getNotificationController().emitEntryCreated(
            req.body.customerId);
        const User = Object.assign({}, req.tokenData, { id: req.tokenData.userId });
        res.send(Object.assign({}, result, { User }));
    } catch (e) {
        return next(new ServerError());
    }
};

const rejectOffer = async (offerId, creatorId, contestId) => {
    const rejectedOffer = await offerQueries.updateOffer(
        { status: CONSTANTS.OFFER_STATUS_REJECTED }, { id: offerId });
    controller.getNotificationController().emitChangeOfferStatus(creatorId,
        'Someone of yours offers was rejected', contestId);
    return rejectedOffer;
};

const resolveOffer = async (
    contestId, creatorId, orderId, offerId, priority, transaction) => {
    const finishedContest = await contestQueries.updateContestStatus({
        status: db.sequelize.literal(`   CASE
            WHEN "id"=${ contestId }  AND "orderId"='${ orderId }' THEN '${ CONSTANTS.CONTEST_STATUS_FINISHED }'
            WHEN "orderId"='${ orderId }' AND "priority"=${ priority +
        1 }  THEN '${ CONSTANTS.CONTEST_STATUS_ACTIVE }'
            ELSE '${ CONSTANTS.CONTEST_STATUS_PENDING }'
            END
    `),
    }, { orderId: orderId }, transaction);
    await userQueries.updateUser(
        { balance: db.sequelize.literal('balance + ' + finishedContest.prize) },
        creatorId, transaction);
    const updatedOffers = await offerQueries.updateOfferStatus({
        status: db.sequelize.literal(` CASE
            WHEN "id"=${ offerId } THEN '${ CONSTANTS.OFFER_STATUS_WON }'
            ELSE '${ CONSTANTS.OFFER_STATUS_REJECTED }'
            END
    `),
    }, {
        contestId: contestId,
    }, transaction);
    transaction.commit();
    const arrayRoomsId = [];
    updatedOffers.forEach(offer => {
        if (offer.status === CONSTANTS.OFFER_STATUS_REJECTED && creatorId !==
            offer.userId) {
            arrayRoomsId.push(offer.userId);
        }
    });
    controller.getNotificationController().emitChangeOfferStatus(arrayRoomsId,
        'Someone of yours offers was rejected', contestId);
    controller.getNotificationController().emitChangeOfferStatus(creatorId,
        'Someone of your offers WIN', contestId);
    return  {...updatedOffers[0].dataValues, prize: finishedContest.prize};
};

module.exports.setOfferStatus = async (req, res, next) => {
    let transaction;
    if (req.body.command === 'reject') {
        try {
            const offer = await rejectOffer(req.body.offerId, req.body.creatorId,
                req.body.contestId);
            res.send(offer);
        } catch (err) {
            next(err);
        }
    } else if (req.body.command === 'resolve') {
        try {
            transaction = await db.sequelize.transaction();
            const winningOffer = await resolveOffer(req.body.contestId,
                req.body.creatorId, req.body.orderId, req.body.offerId,
                req.body.priority, transaction);
            await userQueries.createTransactionByFilter({
                typeOperation: "INCOME",
                sum: winningOffer.prize,
                userId: winningOffer.userId,
            });
            res.send(winningOffer);
        } catch (err) {
            transaction.rollback();
            next(err);
        }
    }
};