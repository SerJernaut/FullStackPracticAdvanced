import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {toast} from 'react-toastify';
import styles from './EventsTimer.module.sass';
import ProgressBar from "../ProgressBar/ProgressBar";

const EventTimer = ({eventsArr, eventName, eventDate, notifyDate, eventCreationDate, index}) => {

    const currentDate = new Date();

    const calcProgressBarPercent = () => {
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

    const countActiveEvents = () => {
        return eventsArr.filter(event => {
            const diffTime = currentDate - event.eventDate;
            return diffTime > 0
        }).length
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

    useEffect(() => {
        const timer = setInterval(() => {
            setTimerData(countdownTimer())
        }, 1000);
        return () => {
            clearInterval(timer)
        };

    }, []);

    const timerArr = Object.entries(timerObj);

    return (
        <li key={index}>
            <mark>{`${eventName}`}</mark>
            <p>{`starts ${eventDate.toLocaleString()}`}</p>
            {(!timerArr.length) && <div className={styles.badgeContainer}>
                <div className={styles.activeEventsBadge}>{countActiveEvents()}</div>
            </div>}
            {(timerArr.length) > 0 &&
            <>
                <ProgressBar className={styles.progressBar} progress={calcProgressBarPercent()}/>
                <div className={styles.timeContainer}>
                    {timerArr.map(([timeUnit, time], index) => {
                        return (
                            (time >= 10) ?
                                <span key={index}>
                    {`${time} ${timeUnit} `}
                    </span>
                                :
                                <span key={index}>
                    {`0${time} ${timeUnit} `}
                    </span>
                        )
                    })}
                </div>
            </>
            }
        </li>


    )


};

const mapStateToProps = state => state.eventsStore;

export default connect(mapStateToProps)(EventTimer);