import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './OfferItem.module.sass';
import CONSTANTS from '../../constants';
import classNames from "classnames";
import moment from 'moment';
import {confirmAlert} from "react-confirm-alert";
import {generateConfirmAlertOptions} from "../../utils/generateConfirmAlertOptions";
import LightBox from "react-image-lightbox";

const OfferItem = ({id, text, fileName, moderationStatus, createdAt, Contest: {contestType, title, User: {id: userId, displayName}}, resolveOfferByModerator, rejectOfferByModerator, isFetching}) => {

    const resolveOfferByModeratorWithId = () => resolveOfferByModerator({offerId: id});

    const rejectOfferByModeratorWithId = () => rejectOfferByModerator({offerId: id});

    const confirmResolvingOffer = () => confirmAlert(generateConfirmAlertOptions('resolving','resolve', resolveOfferByModeratorWithId, true, true));

    const confirmRejectingOffer = () => confirmAlert(generateConfirmAlertOptions('rejecting','reject', rejectOfferByModeratorWithId, true, true));

    const timer = () => {
        const diffBetweenCurrentTimeAndCreatedAtInMs = moment().diff(createdAt);
        const msTime = moment.duration(diffBetweenCurrentTimeAndCreatedAtInMs, 'milliseconds');
        return {
            d: msTime.days(),
            h: msTime.hours(),
            m: msTime.minutes(),
            s: msTime.seconds()
        }
    }

    const [timerObj, setTimerUnits] = useState(timer());
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timeIntervalId = setInterval(() => {
            setTimerUnits(timer())
        }, 1000);
        return () => {
            clearInterval(timeIntervalId)
        };
    }, []);

    return (
        <li className={styles.offerContainer}>
            <div className={classNames(styles.offerIdAndTextContainer, styles.offerStrongItem)}>
                <span>#{id} </span>
                <span>Offer text: </span><span
                className={styles.offerItalicItem}>{text ? `${text}` : 'This offer contains only photo'}</span>
            </div>
            <div className={styles.offerPhotoAndModerationContainer}>
                <div className={styles.mainInfoContainer}>
                    <div className={styles.offerPhotoContainer}>
                        <span className={styles.offerStrongItem}>Offer photo</span>{fileName ?
                        <>
                        <img src={`${CONSTANTS.publicURL}${fileName}`} onClick={()=> setIsOpen(true)} alt="offerFile"/>
                        {isOpen && <LightBox
                            mainSrc={`${CONSTANTS.publicURL}${fileName}`}
                            onCloseRequest={() => setIsOpen(false)}/>}
                        </>
                        :
                        <span className={styles.offerItalicItem}>This offer contains only text</span>}
                    </div>
                    <div className={styles.offerAndUserInfo}>
                        <p className={styles.offerOrUserInfo}>Offer created</p>
                        <span>{timerObj.d} days {timerObj.h} hours {timerObj.m} minutes {timerObj.s} seconds ago</span>
                        <p className={styles.offerOrUserInfo}>By User</p><span
                        className={styles.offerItalicItem}>{displayName} #{userId}</span>
                    </div>
                    <div className={styles.contestInfoContainer}>
                        <p className={styles.offerStrongItem}>Offer created for contest with type:</p>
                        <span className={styles.offerItalicItem}>{contestType}</span>
                        <p className={styles.offerStrongItem}>Contest title:</p>
                        <span className={styles.offerItalicItem}>{title}</span>
                    </div>
                </div>
                <div className={styles.moderationContainer}>
                    <span className={styles.offerStrongItem}>moderator!!!</span>
                    <p className={styles.offerStrongItem}>Offer moderation status is</p><span
                    className={classNames(styles.offerStrongItem, styles.moderationStatus)}>{moderationStatus}</span>
                    <p className={styles.offerItalicItem}>Resolve or reject the offer, please ^_^</p>
                    <div className={styles.buttonsContainer}>
                        <button className={classNames(styles.btn, styles.resolvingBtn, {[styles.disabled]: isFetching})} onClick={confirmResolvingOffer} disabled={isFetching}>resolve</button>
                        <button className={classNames(styles.btn, styles.rejectingBtn, {[styles.disabled]: isFetching})} onClick={confirmRejectingOffer}  disabled={isFetching}>reject</button>
                    </div>
                </div>
            </div>
        </li>
    );
}

OfferItem.propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string,
    fileName: PropTypes.string,
    moderationStatus: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    resolveOfferByModerator: PropTypes.func.isRequired,
    rejectOfferByModerator: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    Contest: PropTypes.shape({
        contestType: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        User: PropTypes.shape({
            id: PropTypes.number.isRequired,
            displayName: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default OfferItem;