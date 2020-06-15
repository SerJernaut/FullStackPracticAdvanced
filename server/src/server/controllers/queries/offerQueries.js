const bd = require('../../models/index');
const ServerError = require('../../errors/ServerError');

module.exports.getAllOffers = async (filter) => {
    const offers = await bd.Offers.findAll(filter);
    if (offers.length > 0) {return offers;}
    throw "Can not get offers";
};


module.exports.updateOffer = async (data, predicate, transaction) => {
    const [updatedCount, [updatedOffer]] = await bd.Offers.update(data,
        { where: predicate, returning: true, transaction });
    if (updatedCount === 1) {
        return updatedOffer.dataValues;
    } else {
        throw new ServerError('cannot update offer!');
    }
};

module.exports.updateOfferStatus = async (data, predicate, transaction) => {
    const result = await bd.Offers.update(data,
        { where: predicate, returning: true, transaction });
    if (result[ 0 ] >= 1) {
        return result[ 1 ];
    }
    throw new ServerError('cannot update offer!');
};

module.exports.createOffer = async (filter, options) => {
    const result = await bd.Offers.create(filter, options);
    if ( result) {
        return result.get({ plain: true });
    }
    throw new ServerError('cannot create new Offer');
};

