const ServerError = require('../errors/ServerError');
const contestQueries = require('./queries/contestQueries');
const db = require('../models/index');
const UtilFunctions = require('../utils/functions');
const CONSTANTS = require('../../constants');

module.exports.findContestById = async (req, res, next) => {
  try{
    const {contestId} = req.updatedOffer;
    req.foundContest = await contestQueries.findContestByFilter({where: {id: contestId}, attributes: ['contestType', 'title']});
    next();
  }
  catch (err) {
    next(err);
  }
}

module.exports.dataForContest = async (req, res, next) => {
  let response = {};
  try {
    const characteristics = await db.Selects.findAll({
      where: {
        type: {
          [ db.Sequelize.Op.or ]: [
            req.body.characteristic1,
            req.body.characteristic2,
            'industry',
          ],
        },
      },
    });
    if ( !characteristics) {
      return next(new ServerError());
    }
    characteristics.forEach(characteristic => {
      if ( !response[ characteristic.type ]) {
        response[ characteristic.type ] = [];
      }
      response[ characteristic.type ].push(characteristic.describe);
    });
    res.send(response);
  } catch (err) {
    next(new ServerError('cannot get contest preferences'));
  }
};

module.exports.getContestById = async (req, res, next) => {
  try {
    const {tokenData: {userId, role}, headers: {contestid}} = req;
    const contestInfo = await db.Contests.findOne({
      where: {id: contestid},
      order: [
        [db.Offers, 'id', 'asc'],
      ],
      include: [
        {
          model: db.Users,
          required: true,
          attributes: {
            exclude: [
              'password',
              'role',
              'balance',
              'accessToken',
            ],
          },
        },
        {
          model: db.Offers,
          required: false,
          where: role === CONSTANTS.CREATOR
              ? {userId}
              : role === CONSTANTS.CUSTOMER ? {moderationStatus: CONSTANTS.OFFER_MODERATION_RESOLVED_STATUS} :
                  {},
          attributes: {exclude: ['userId', 'contestId']},
          include: [
            {
              model: db.Users,
              required: true,
              attributes: {
                exclude: [
                  'password',
                  'role',
                  'balance',
                  'accessToken',
                ],
              },
            },
            {
              model: db.Ratings,
              required: false,
              where: {userId: req.tokenData.userId},
              attributes: {exclude: ['userId', 'offerId']},
            },
          ],
        },
      ],
    });
    req.contestInfo = contestInfo.get({plain: true});
    next()
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.saveRatingMarkToReqIfNotEmptyAndSendContestInfo = (req, res, next) => {
  const {contestInfo} = req;
  if (contestInfo) {
    contestInfo.Offers.forEach(offer => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });
    return res.send(contestInfo);
  }
  next(new ServerError(`Can't find contestInfo in database`))
}

module.exports.downloadFile = async (req, res, next) => {
  const file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName;
  res.download(file);
};

module.exports.updateContest = async (req, res, next) => {
  if (req.file) {
    req.body.fileName = req.file.filename;
    req.body.originalFileName = req.file.originalname;
  }
  const contestId = req.body.contestId;
  delete req.body.contestId;
  try {
    const updatedContest = await contestQueries.updateContest(req.body, {
      id: contestId,
      userId: req.tokenData.userId,
    });
    res.send(updatedContest);
  } catch (e) {
    next(e);
  }
};

module.exports.getCustomersContests = async (req, res, next) => {
  try{
    const {headers: {status}, tokenData: {userId}, body: {limit, offset}} = req
    const contests = await db.Contests.findAll({
      where: {status, userId},
      limit,
      offset: offset || 0,
      order: [['id', 'DESC']],
      include: [
        {
          model: db.Offers,
          where: {moderationStatus: CONSTANTS.OFFER_MODERATION_RESOLVED_STATUS},
          required: false,
          attributes: ['id'],
        },
      ],
    })
    if (contests) {
      contests.forEach(
          contest => contest.dataValues.count = contest.dataValues.Offers.length);
      return res.send({ contests, hasMore: limit <= contests.length });
    }
    next(new ServerError())
  }
  catch(e) {
    next(e);
  }
};

module.exports.getContests = async (req, res, next) => {
  const {body: {limit, offset, ownEntries}, tokenData: {userId}} = req;
  try{
    const contests = await db.Contests.findAll({
      where: {
        status: {
          [db.Sequelize.Op.or]: [
            CONSTANTS.CONTEST_STATUS_FINISHED,
            CONSTANTS.CONTEST_STATUS_ACTIVE,
          ],
        }
      },
      limit: limit,
      offset: offset || 0,
      include: [
        {
          model: db.Offers,
          required: ownEntries,
          where: ownEntries ? { userId } : {},
          attributes: ['id'],
        },
      ],
    })
    if(contests) {
      contests.forEach(
          contest => contest.dataValues.count = contest.dataValues.Offers.length);
      return res.send({ contests, hasMore: contests.length >= limit });
    }
    next(new ServerError())
  }
    catch(err) {
      next(err)
    }
};



