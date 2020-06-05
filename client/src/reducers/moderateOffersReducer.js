import ACTION from '../actions/actionTypes';
import _ from 'lodash';

const initialState = {
    offers: [],
    hasMore: null,
    isFetching: false,
    error: null,
    resolvedNoticeMessage: '',
    rejectedNoticeMessage: ''
};

const deleteObjFromArrById = (offerArr, offerId) => offerArr.filter(offer=> offer.id !== offerId);

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.GET_MODERATION_OFFERS_REQUEST:
        case ACTION.OFFER_MODERATION_RESOLVING_REQUEST:
        case ACTION.OFFER_MODERATION_REJECTING_REQUEST:
            return {
                ...state,
                isFetching: true,
            }
        case ACTION.GET_MODERATION_OFFERS_SUCCESS:
        {
            const {offers, hasMore} = action;
            return {
                ...state,
                offers: [...state.offers, ...offers],
                hasMore,
                isFetching: false,
            }
        }
        case ACTION.OFFER_MODERATION_RESOLVING_SUCCESS:
        {
            const {offerId, resolvedNoticeMessage} = action;
            const {offers} = state;
            const offersClone = _.clone(offers);
            const newState = deleteObjFromArrById(offersClone, offerId);
            return {
                ...state,
                offers: newState,
                isFetching: false,
                resolvedNoticeMessage
            }
        }
        case ACTION.OFFER_MODERATION_REJECTING_SUCCESS:
        {
            const {offerId, rejectedNoticeMessage} = action;
            const {offers} = state;
            const offersClone = _.clone(offers);
            const newState = deleteObjFromArrById(offersClone, offerId);
            return {
                ...state,
                offers: newState,
                isFetching: false,
                rejectedNoticeMessage
            }
        }

        case ACTION.GET_MODERATION_OFFERS_ERROR:
        case ACTION.OFFER_MODERATION_RESOLVING_ERROR:
        case ACTION.OFFER_MODERATION_REJECTING_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.error,
            }

        default:
            return state;
    }
}

