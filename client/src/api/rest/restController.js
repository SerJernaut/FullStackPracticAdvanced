import http from '../interceptor';

export const registerRequest = (data) => http.post('authentication/registration', data);
export const loginRequest = (data) => http.post('authentication/login', data);
export const getUser = () => http.post('user/getUser');
export const updateContest = data => http.post('contests/updateContest', data);
export const setNewOffer = data => http.post( 'offers/setNewOffer', data);
export const setOfferStatus = data => http.post('offers/setOfferStatus', data);
export const downloadContestFile = (data) => http.get('contests/downloadFile/' + data.fileName);
export const payMent = (data) => http.post('contests/pay', data.formData);
export const changeMark = (data) => http.post('offers/changeMark', data);
export const getPreviewChat = () => http.post('chat/getPreview');
export const getDialog = (data) => http.post('chat/getChat', data);
export const dataForContest = (data) => http.post('contests/dataForContest', data);
export const cashOut = (data) => http.post('user/cashout', data);
export const updateUser = (data) => http.post('user/updateUser', data);
export const newMessage = (data) => http.post('chat/newMessage', data);
export const changeChatFavorite = (data) => http.post('chat/favorite', data);
export const changeChatBlock = (data) => http.post('chat/blackList', data);
export const getCatalogList = (data) => http.post('chat/getCatalogs', data);
export const addChatToCatalog = (data) => http.post('chat/addNewChatToCatalog', data);
export const createCatalog = (data) => http.post('chat/createCatalog', data);
export const deleteCatalog = (data) => http.post('chat/deleteCatalog', data);
export const removeChatFromCatalog = (data) => http.post('chat/removeChatFromCatalog', data);
export const changeCatalogName = (data) => http.post('chat/updateNameCatalog', data);
export const getCustomersContests = (data) => {
    return http.post('contests/getCustomersContests', {limit: data.limit, offset: data.offset}, {
        headers: {
            status: data.contestStatus
        }
    });
};

export const getActiveContests = ({offset, limit, typeIndex, contestId, industry, awardSort, ownEntries}) => {
    return http.post('contests/getAllContests', {offset, limit, typeIndex, contestId, industry, awardSort, ownEntries})
};

export const getContestById = (data) => {
    return http.get('contests/getContestById', {
        headers: {
            contestId: data.contestId
        }
    });
};

export const getUserTransactionsHistory = () => {
    return http.get('user/getUserTransactionsHistory');
}

export const getUserTransactionStatements = () => {
    return http.get('user/getUserTransactionBankStatements');
}

export const resetPassword = formValues => {
    return http.post('recovery/send_email_for_reset_password', formValues);
}

export const confirmResetPassword = accessToken => {
    return http.post('recovery/confirm_reset_password', accessToken);
}

export const getModerationOffers = paginationFilter => {
    return http.post('offers/getModerationOffers', paginationFilter)
}

export const moderationResolvingOffer = offerId => {
    return http.post('offers/moderationResolvingOffer', offerId)
}

export const moderationRejectingOffer = offerId => {
    return http.post('offers/moderationRejectingOffer', offerId)
}



