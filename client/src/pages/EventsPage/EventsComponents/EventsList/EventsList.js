import React from 'react';
import {connect} from "react-redux";
import EventTimer from "../EventTimer/EventTimer";
import styles from './EventsList.module.sass'

const EventsList = ({eventsArr}) => {
    return (
        <div className={styles.eventsContainer}>
            <h2>Live upcomming checks</h2>
            <ul>
                {eventsArr.map((event, index) => {
                    const listKey = index + event.eventDate
                    return (
                           <EventTimer key={listKey} {...event} eventsArr={eventsArr}/>
                    )
                }) }
            </ul>

        </div>

    )
};

const mapStateToProps = state => state.eventsStore;

export default connect(mapStateToProps)(EventsList);