import ACTION from '../actions/actionTypes';


const initialState = {
    transactions: [],
    transactionStatements: {},
    isFetching: false,
    error: null
};


export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.GET_USER_TRANSACTIONS_HISTORY_REQUEST:
        case ACTION.GET_USER_TRANSACTION_STATEMENTS_REQUEST:
            {
            return {
                ...state,
                isFetching: true,
            }
        }
        case ACTION.GET_USER_TRANSACTIONS_HISTORY_SUCCESS:
            {
            return {
                ...state,
                transactions: action.data,
                isFetching: false,
            }
        }
        case ACTION.GET_USER_TRANSACTION_STATEMENTS_SUCCESS:
        {
            return {
                ...state,
                transactionStatements: action.data,
                isFetching: false,
            }
        }

        case ACTION.GET_USER_TRANSACTIONS_HISTORY_ERROR:
        case ACTION.GET_USER_TRANSACTION_STATEMENTS_ERROR:
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

