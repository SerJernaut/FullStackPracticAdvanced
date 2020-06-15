const bd = require('../models/index');
const RightsError = require('../errors/RightsError');
const ServerError = require('../errors/ServerError');
import CONSTANTS from '../../constants';

module.exports.parseBody = (req, res, next) => {
  req.body.contests = JSON.parse(req.body.contests);
  for (let i = 0; i < req.body.contests.length; i++) {
    if (req.body.contests[ i ].haveFile) {
      const file = req.files.splice(0, 1);
      req.body.contests[ i ].fileName = file[ 0 ].filename;
      req.body.contests[ i ].originalFileName = file[ 0 ].originalname;
    }
  }
  next();
};

module.exports.canGetContest = async (req, res, next) => {
  let result = null;
  try {
    if (req.tokenData.role === CONSTANTS.CUSTOMER) {
      result = await bd.Contests.findOne({
        where: { id: req.headers.contestid, userId: req.tokenData.userId },
      });
    } else if (req.tokenData.role === CONSTANTS.CREATOR) {
      result = await bd.Contests.findOne({
        where: {
          id: req.headers.contestid,
          status: {
            [ bd.Sequelize.Op.or ]: [
              CONSTANTS.CONTEST_STATUS_ACTIVE,
              CONSTANTS.CONTEST_STATUS_FINISHED,
            ],
          },
        },
      });
    }
    !!result ? next() : next(new RightsError());
  } catch (e) {
    next(new ServerError(e));
  }
};

module.exports.onlyForCreative = (req, res, next) => {
  if (req.tokenData.role === CONSTANTS.CREATOR) {
    return next();
  }
    next(new RightsError('this page only for creators'));

};

module.exports.onlyForCustomer = (req, res, next) => {
  if (req.tokenData.role === CONSTANTS.CUSTOMER) {
    return next();
  }
    next(new RightsError('this page only for customers'));

};

module.exports.onlyForModerator= (req, res, next) => {
  if (req.tokenData.role === CONSTANTS.MODERATOR) {
    return next();
  }
    next(new RightsError('this page only for moderators'));

};

module.exports.canSendOffer = async (req, res, next) => {
  try {
    const result = await bd.Contests.findOne({
      where: {
        id: req.body.contestId,
      },
      attributes: ['status'],
    });
    if (result.get({ plain: true }).status ===
      CONSTANTS.CONTEST_STATUS_ACTIVE) {
      return next();
    }
    next(new RightsError());

  } catch (e) {
    next(e);
  }

};

module.exports.onlyForCustomerWhoCreateContest = async (req, res, next) => {
  try {
    const {tokenData: {userId}, body: {contestId}} = req;
    const result = await bd.Contests.findOne({
      where: {
        userId: userId,
        id: contestId,
        status: CONSTANTS.CONTEST_STATUS_ACTIVE,
      },
    });
    if ( result) {
      return next();
    }
    next(new RightsError());
  } catch (e) {
    next(e);
  }
};

module.exports.canUpdateContest = async (req, res, next) => {
  try {
    const {body: {contestId}, tokenData: {userId}} = req;
    const result = bd.Contests.findOne({
      where: {
        userId: userId,
        id: contestId,
        status: { [ bd.Sequelize.Op.not ]: CONSTANTS.CONTEST_STATUS_FINISHED },
      },
    });
    if ( result) {
     return next()
    }
    next(new RightsError());
  } catch (e) {
    next(e);
  }
};

