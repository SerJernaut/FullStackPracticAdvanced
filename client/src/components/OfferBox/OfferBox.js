import React from 'react';
import styles from './OfferBox.module.sass';
import CONSTANTS from '../../constants';
import {connect} from 'react-redux';
import Rating from 'react-rating';
import {
    changeMark,
    clearChangeMarkError,
    goToExpandedDialog,
    changeShowImage,
} from '../../actions/actionCreator';
import {withRouter} from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './confirmStyle.css';
import PropTypes from 'prop-types';


const OfferBox = props => {

    const findConversationInfo = () => {
        const {messagesPreview, id} = props;
        const participants = [id, props.data.User.id];
        participants.sort((participant1, participant2) => participant1 - participant2);
        for (let i = 0; i < messagesPreview.length; i++) {
            if (isEqual(participants, messagesPreview[i].participants)) {
                return {
                    participants: messagesPreview[i].participants,
                    _id: messagesPreview[i]._id,
                    blackList: messagesPreview[i].blackList,
                    favoriteList: messagesPreview[i].favoriteList
                };
            }
        }
        return null;
    };


    const resolveOfferByCustomer = () => {
        confirmAlert({
            title: 'confirm',
            message: 'Are u sure?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => props.setOfferStatus(props.data.User.id, props.data.id, 'resolve')
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    const rejectOfferByCustomer = () => {
        confirmAlert({
            title: 'confirm',
            message: 'Are u sure?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => props.setOfferStatus(props.data.User.id, props.data.id, 'reject')
                },
                {
                    label: 'No',
                }
            ]
        });
    };


    const changeMark = (value) => {
        props.clearError();
        props.changeMark({
            mark: value,
            offerId: props.data.id,
            isFirst: !props.data.mark,
            creatorId: props.data.User.id
        });
    };

    const {data: {status, moderationStatus}, role} = props;

    const offerStatus = () => {
        if (role && role !== CONSTANTS.MODERATOR && status) {
            switch (status) {
                case CONSTANTS.OFFER_STATUS_WON: {
                    return (moderationStatus === CONSTANTS.OFFER_MODERATION_RESOLVED_STATUS) &&
                        <i className={classNames("fas fa-check-circle resolve", styles.resolve)}/>
                }
                case CONSTANTS.OFFER_STATUS_REJECTED: {
                    return (moderationStatus === CONSTANTS.OFFER_MODERATION_RESOLVED_STATUS) &&
                        <i className={classNames("fas fa-times-circle reject", styles.reject)}/>
                }
                case CONSTANTS.OFFER_STATUS_PENDING: {
                    return <span>{(() => {
                        switch (moderationStatus) {
                            case CONSTANTS.OFFER_MODERATION_RESOLVED_STATUS: {
                                return (role === CONSTANTS.CUSTOMER) ? "Reject or resolve the offer!" : (role === CONSTANTS.CREATOR) && "Customer has not been yet review your offer!"
                            }
                            case CONSTANTS.OFFER_MODERATION_REJECTED_STATUS: {
                                return (role === CONSTANTS.CREATOR) && "Your offer is rejected by moderator!"
                            }
                            case CONSTANTS.OFFER_MODERATION_EXPECTED_STATUS: {
                                return (role === CONSTANTS.CREATOR) && "Wait until the moderator check the offer! Then customer will see your offer and maybe will resolve it!"
                            }
                            default:
                                return null;
                        }
                    })()} </span>
                }
                default:
                    return null;
            }
        }
        return null;
    }

    const goChat = () => {
        props.goToExpandedDialog({interlocutor: props.data.User, conversationData: findConversationInfo()});
    };


    const {data, id, contestType} = props;
    const {avatar, firstName, lastName, email, rating} = props.data.User;
    return (
        <div className={styles.offerContainer}>
            {role && (role !== CONSTANTS.MODERATOR) && offerStatus()}
            <div className={styles.mainInfoContainer}>
                <div className={styles.userInfo}>
                    <div className={styles.creativeInfoContainer}>
                        <img
                            src={avatar === 'anon.png' ? CONSTANTS.ANONYM_IMAGE_PATH : `${CONSTANTS.publicURL}${avatar}`}
                            alt='user'/>
                        <div className={styles.nameAndEmail}>
                            <span>{firstName + ' ' + lastName}</span>
                            <span>{email}</span>
                        </div>
                    </div>
                    <div className={styles.creativeRating}>
                        <span className={styles.userScoreLabel}>Creative Rating </span>
                        <Rating
                            initialRating={rating}
                            fractions={2}
                            fullSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt='star'/>}
                            placeholderSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt='star'/>}
                            emptySymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
                                              alt='star-outline'/>}
                            readonly={true}
                        />
                    </div>
                </div>
                <div className={styles.responseConainer}>
                    {
                        contestType === CONSTANTS.LOGO_CONTEST ?
                            <img onClick={() => props.changeShowImage({imagePath: data.fileName, isShowOnFull: true})}
                                 className={styles.responseLogo}
                                 src={`${CONSTANTS.publicURL}${data.fileName}`} alt='logo'/>
                            :
                            <span className={styles.response}>{data.text}</span>
                    }
                    {data.User.id !== id && <Rating
                        fractions={2}
                        fullSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt='star'/>}
                        placeholderSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt='star'/>}
                        emptySymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`} alt='star'/>}
                        onClick={changeMark}
                        placeholderRating={data.mark}
                    />}
                </div>
                {role === CONSTANTS.CUSTOMER && <i onClick={goChat} className="fas fa-comments"/>}
            </div>
            {props.needButtons(data.status) && <div className={styles.btnsContainer}>
                <div onClick={resolveOfferByCustomer} className={styles.resolveBtn}>Resolve</div>
                <div onClick={rejectOfferByCustomer} className={styles.rejectBtn}>Reject</div>
            </div>}
        </div>
    )
};


const mapDispatchToProps = (dispatch) => {
    return {
        changeMark: (data) => dispatch(changeMark(data)),
        clearError: () => dispatch(clearChangeMarkError()),
        goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
        changeShowImage: (data) => dispatch(changeShowImage(data))
    }
};

const mapStateToProps = (state) => {
    const {changeMarkError, isShowModal} = state.contestByIdStore;
    const {id, role} = state.userStore.data;
    const {messagesPreview} = state.chatStore;
    return {changeMarkError, id, role, messagesPreview, isShowModal};
};

OfferBox.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        status: PropTypes.oneOf([CONSTANTS.OFFER_STATUS_PENDING, CONSTANTS.OFFER_STATUS_WON, CONSTANTS.OFFER_STATUS_REJECTED]).isRequired,
        moderationStatus: PropTypes.oneOf([CONSTANTS.OFFER_MODERATION_EXPECTED_STATUS , CONSTANTS.OFFER_MODERATION_RESOLVED_STATUS, CONSTANTS.OFFER_MODERATION_REJECTED_STATUS]).isRequired,
        text: PropTypes.string
    }).isRequired,
    key: PropTypes.number,
    needButtons: PropTypes.func.isRequired,
    setOfferStatus: PropTypes.func.isRequired,
    contestType: PropTypes.oneOf([CONSTANTS.CONTEST_NAME_TYPE, CONSTANTS.CONTEST_TAGLINE_TYPE, CONSTANTS.CONTEST_LOGO_TYPE]).isRequired,
    date: PropTypes.instanceOf(Date)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OfferBox));