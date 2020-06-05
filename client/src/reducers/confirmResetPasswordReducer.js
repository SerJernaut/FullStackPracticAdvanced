import ACTION from '../actions/actionTypes';

const initialState = {
    resetConfirmNoticeMessage: '',
    isFetching: false,
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.CONFIRM_RESET_PASSWORD_REQUEST:
        {
            return {
                ...state,
                isFetching: true,
            }
        }
        case ACTION.CONFIRM_RESET_PASSWORD_SUCCESS:
        {
            return {
                ...state,
                resetConfirmNoticeMessage: action.noticeMessage,
                isFetching: false,
            }
        }

        case ACTION.CONFIRM_RESET_PASSWORD_ERROR:
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

