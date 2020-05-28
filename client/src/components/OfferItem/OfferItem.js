import React, {useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './OfferItem.module.sass';
import CONSTANTS from '../../constants';
import classNames from "classnames";
import moment from 'moment';

const OfferItem = ({
                       id, text, fileName, moderationStatus, createdAt, Contest: {
        contestType, title, User: {
            userId, displayName
        }
    }
                   }) => {

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
            <div className={styles.offerPhotoAndModerationStatusContainer}>
                <div className={styles.offerPhotoContainer}>
                    <span className={styles.offerStrongItem}>Offer photo: </span>{fileName ?
                    <img src={`${CONSTANTS.publicURL}${fileName}`} alt="offerFile"/> :
                    <span className={styles.offerItalicItem}>This offer contains only text</span>}
                </div>
                <div className={styles.offerAndUserInfo}>
                    <p className={styles.offerOrUserInfo}>Offer created</p>
                    <span>{timerObj.d} days {timerObj.h} hours {timerObj.m} minutes {timerObj.s} seconds ago</span>
                    <p className={styles.offerOrUserInfo}>By User</p><span
                    className={styles.offerItalicItem}>{displayName} #{userId}</span>
                </div>
                <div className={styles.moderationStatusContainer}>
                    <span className={styles.offerStrongItem}>moderator!!!</span>
                    <p className={styles.offerStrongItem}>Offer moderation status is</p><span
                    className={classNames(styles.offerStrongItem, styles.moderationStatus)}>{moderationStatus}</span>
                    <p className={styles.offerItalicItem}>Resolve or reject the offer, please ^_^</p>
                </div>
                <div className={styles.contestInfoContainer}>
                    <p className={styles.offerStrongItem}>Offer created for contest with type:</p>
                    <span className={styles.offerItalicItem}>{contestType}</span>
                    <p className={styles.offerStrongItem}>Contest title:</p>
                    <span className={styles.offerItalicItem}>{title}</span>
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