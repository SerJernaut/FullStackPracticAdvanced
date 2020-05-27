import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './OfferItem.module.sass';
import CONSTANTS from '../../constants';
import classNames from "classnames";
import moment from 'moment';

const OfferItem = ({id, text, fileName, moderationStatus, createdAt, User: {id: userId, displayName}}) =>  {

    const [currentTime, setCurrentTime] = useState(moment());

    useEffect(()=> {
        setInterval(()=> {
            setCurrentTime(moment());
        }, 1000)

    })
     const diffBetweenCurrentTimeAndCreatedAtInMs = currentTime.diff(createdAt);
     const d = moment.duration(diffBetweenCurrentTimeAndCreatedAtInMs, 'milliseconds')
     const days = Math.floor(d.asDays());
     const hours = d.hours();
     const minutes = d.minutes();
     const seconds = d.seconds();


    return (
        <li className={styles.offerContainer}>
            <div className={classNames(styles.offerIdAndTextContainer, styles.offerStrongItem)}>
                <span>#{id} </span>
                <span>Offer text: </span><span className={styles.offerItalicItem}>{text? `${text}`: 'This offer contains only photo'}</span>
            </div>
            <div className={styles.offerPhotoAndModerationStatusContainer}>
                <div className={styles.offerPhotoContainer}>
                    <span className={styles.offerStrongItem}>Offer photo: </span>{fileName? <img src={`${CONSTANTS.publicURL}${fileName}`} alt="offerFile"/>: <span className={styles.offerItalicItem}>This offer contains only text</span>}
                </div>
                <div className={styles.offerAndUserInfo}>
                    <p className={styles.offerOrUserInfo}>Offer created</p>
                    <span>{days} days {hours} hours {minutes} minutes {seconds} seconds ago</span>
                    <p className={styles.offerOrUserInfo}>By User</p><span className={styles.offerItalicItem}>{displayName} #{userId}</span>
                </div>
                <div className={styles.moderationStatusContainer}>
                    <span className={styles.offerStrongItem}>moderator!!!</span>
                    <p className={styles.offerStrongItem}>My moderation status is</p><span className={classNames(styles.offerStrongItem, styles.moderationStatus)}>{moderationStatus}</span>
                    <p className={styles.offerItalicItem}>Resolve or reject me, please ^_^</p>
                </div>
            </div>
        </li>
    );
}

OfferItem.propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string,
    fileName: PropTypes.string,
    status: PropTypes.string.isRequired,
    moderationStatus: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    User: PropTypes.objectOf(PropTypes.string.isRequired).isRequired
};

export default OfferItem;