import React from 'react';
import {connect} from "react-redux";
import EventTimer from "../EventTimer/EventTimer";
import styles from './EventsList.module.sass'

const EventsList = (props) => {
    const {eventsArr} = props;
    return (
        <div className={styles.eventsContainer}>
            <h2>Live upcomming checks</h2>
            <ul>
                {eventsArr.map((event, index) => {
                    return (
                           <EventTimer key={index} index={index} {...event} eventsArr={eventsArr}/>
                    )
                }) }
            </ul>

        </div>

    )
};

const mapStateToProps = state => state.eventsStore;

export default connect(mapStateToProps)(EventsList);