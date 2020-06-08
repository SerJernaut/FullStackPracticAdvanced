import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {toast} from 'react-toastify';
import styles from './EventsTimer.module.sass';
import ProgressBar from "../ProgressBar/ProgressBar";
import PropTypes from 'prop-types';
import TimerUnitsBody from "../TimerUnitsBody/TimerUnitsBody";

const EventTimer = ({eventName, eventDate, notifyDate, eventCreationDate, numberOfActiveEvents, incrementNumberOfActiveEvents}) => {

    const calcProgressBarPercent = () => {
        const currentDate = new Date();
        const timeFromEventCreation = Math.floor((currentDate - eventCreationDate));
        const eventDuration = Math.floor((eventDate - eventCreationDate));
        return Math.floor((timeFromEventCreation/eventDuration) * 100);
    }

    const generateTimeUnits = msTime => {
        return {
            d: Math.floor(msTime / (1000 * 60 * 60 * 24)),
            h: Math.floor((msTime / (1000 * 60 * 60)) % 24),
            m: Math.floor((msTime / 1000 / 60) % 60),
            s: Math.floor((msTime / 1000) % 60),
        }
    }

    const countdownTimer = () => {
        const currentDate = new Date();
        const timeRemainsToEvent = eventDate - currentDate;
        const timeRemainsToEventAsSec = Math.floor(timeRemainsToEvent / 1000);
        const timeLeftToEventFromNotification = eventDate - notifyDate;
        const timeLeftToEventFromNotificationAsSec = Math.floor(timeLeftToEventFromNotification / 1000);
        if (timeRemainsToEventAsSec === timeLeftToEventFromNotificationAsSec && !toast.isActive(1)) {
            const timeToEvent = eventDate - notifyDate;
            const timeToEventObj = generateTimeUnits(timeToEvent);
            const notifyMessage = `ATTENTION!!! Notification message: It remains ${timeToEventObj.d} d, ${timeToEventObj.h} h, ${timeToEventObj.m} m ${timeToEventObj.s} s to ${eventName}`;
            toast(notifyMessage, {
                toastId: 1
            })
        }
        if (timeRemainsToEvent > 0) {
            return generateTimeUnits(timeRemainsToEvent)
        }
        return {}
    }

    const [timerObj, setTimerData] = useState(countdownTimer());
    const [isExecutedIncrement, setIsExecutedIncrement] = useState(false);
    const timerArr = Object.entries(timerObj);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimerData(countdownTimer())
        }, 1000);
        if (timerArr.length === 0 && !isExecutedIncrement) {
            clearTimeout(timer);
            incrementNumberOfActiveEvents()
            setIsExecutedIncrement(true)
        }
        return () => {
            clearTimeout(timer)
        };
    });

    return (
        <li>
            <mark>{`${eventName}`}</mark>
            <p>{`starts ${eventDate.toLocaleString()}`}</p>
            {(!timerArr.length) && <div className={styles.badgeContainer}>
                <div className={styles.activeEventsBadge}>{numberOfActiveEvents}</div>
            </div>}
            {(timerArr.length) > 0 &&
            <>
                <ProgressBar className={styles.progressBar} progress={calcProgressBarPercent()}/>
                <TimerUnitsBody className={styles.timeContainer} timerArr={timerArr}/>
            </>
            }
        </li>
    )


};

const mapStateToProps = state => state.eventsStore;

EventTimer.propTypes = {
    eventName: PropTypes.string.isRequired,
    eventDate: PropTypes.instanceOf(Date).isRequired,
    notifyDate: PropTypes.instanceOf(Date).isRequired,
    eventCreationDate: PropTypes.instanceOf(Date).isRequired,
    incrementNumberOfActiveEvents: PropTypes.func.isRequired,
    numberOfActiveEvents: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(EventTimer);