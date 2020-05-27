import ACTION from '../actions/actionTypes';

const initialState = {
    offers: [],
    isMore: null,
    isFetching: false,
    error: null,
    resolvedNoticeMessage: '',
    rejectedNoticeMessage: ''
};

export default function (state = initialState, action) {
    const {offers, isMore} = action;
    switch (action.type) {
        case ACTION.GET_MODERATION_OFFERS_REQUEST:

        {
            return {
                ...state,
                isFetching: true,
            }
        }
        case ACTION.GET_MODERATION_OFFERS_SUCCESS:
        {

            return {
                ...state,
                offers: [...state.offers, ...offers],
                isMore,
                isFetching: false,
            }
        }

        case ACTION.GET_MODERATION_OFFERS_ERROR:

        {
            return {
                ...state,
                isFetching: false,
                error: action.error,
            }
        }
        default:
            return state;
    }
}

