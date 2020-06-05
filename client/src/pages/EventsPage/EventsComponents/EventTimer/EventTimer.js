import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {toast} from 'react-toastify';
import styles from './EventsTimer.module.sass';

const EventTimer = (props) => {

    const {eventsArr, eventName, eventDate, notifyDate, index} = props;
    const timeLeftToEvent = eventDate - notifyDate;
    console.log(timeLeftToEvent)

    const generateTimeUnits = msTime => {
        return {
            d: Math.floor(msTime / (1000 * 60 * 60 * 24)),
            h: Math.floor((msTime / (1000 * 60 * 60)) % 24),
            m: Math.floor((msTime / 1000 / 60) % 60),
            s: Math.floor((msTime / 1000) % 60),
        }
    }

    const countActiveEvents = () => {
        return eventsArr.filter(event=>{
            const currentTime = new Date();
            const diffTime = currentTime - event.eventDate;
            return diffTime > 0
        }).length
    }

    const countdownTimer = () => {
        const currentDate = new Date();
        const diffTime = eventDate - currentDate;
        const diffTimeAsSec = Math.floor(diffTime/1000);
        console.log(diffTimeAsSec)
        const timeLeftToEventAsSec = Math.floor(timeLeftToEvent/1000);
        console.log(timeLeftToEventAsSec)
        if(diffTimeAsSec === timeLeftToEventAsSec && !toast.isActive(1)) {
            const timeToEvent = eventDate - notifyDate;
            console.log(timeToEvent)
            const timeToEventObj = generateTimeUnits(timeToEvent);
            const notifyMessage = `ATTENTION!!! Notification message: It remains ${timeToEventObj.d} d, ${timeToEventObj.h} h, ${timeToEventObj.m} m ${timeToEventObj.s} s to ${eventName}`;
            toast(notifyMessage, {
                toastId: 1
            })}
        if(diffTime > 0) {
            return generateTimeUnits(diffTime)
        }
        return {}
    }
    const [timerObj, setTimerData] = useState(countdownTimer());

    useEffect(() => {
        const timer = setInterval(()=>{
            setTimerData(countdownTimer())
        }, 1000);
        return () => {
            clearInterval(timer)
        };

    }, []);

    const timerArr =  Object.entries(timerObj);
    return(
        <>
        <li key={index}><mark>{`${eventName}`}</mark>{`starts ${eventDate.toLocaleString()}`}
            {(!timerArr.length) && <div className={styles.activeEventsBadge}>{countActiveEvents()}</div>}
            {timerArr.length > 0 &&
                timerArr.map(([timeUnit, time],index)=> {
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
            })


            }

        </li>
            </>

      )




};

const mapStateToProps = state => state.eventsStore;

export default connect(mapStateToProps)(EventTimer);