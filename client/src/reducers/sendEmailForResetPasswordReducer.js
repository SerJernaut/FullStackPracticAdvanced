import ACTION from '../actions/actionTypes';

const initialState = {
    resetNoticeMessage:'',
    isFetching: false,
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.SEND_EMAIL_FOR_RESET_PASSWORD_REQUEST:
        {
            return {
                ...state,
                isFetching: true,
            }
        }
        case ACTION.SEND_EMAIL_FOR_RESET_PASSWORD_SUCCESS:
        {
            return {
                ...state,
                resetNoticeMessage: action.noticeMessage,
                isFetching: false,
            }
        }
        case ACTION.SEND_EMAIL_FOR_RESET_PASSWORD_ERROR:
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

