import React from 'react';
import {connect} from "react-redux";
import EventTimer from "../EventTimer/EventTimer";
import styles from './EventsList.module.sass'
import {incrementNumberOfActiveEventsAction} from "../../../../actions/actionCreator";

const EventsList = ({eventsArr, numberOfActiveEvents, incrementNumberOfActiveEvents}) => {

    return (
        <div className={styles.eventsContainer}>
            <h2>Live upcomming checks</h2>
            <ul>
                {eventsArr.map((event, index) => {
                    const listKey = index + event.eventDate
                    return (
                           <EventTimer key={listKey} numberOfActiveEvents={numberOfActiveEvents} incrementNumberOfActiveEvents={incrementNumberOfActiveEvents} {...event}/>
                    )
                }) }
            </ul>

        </div>

    )
};

const mapStateToProps = state => state.eventsStore;

const mapDispatchToProps = dispatch => (({incrementNumberOfActiveEvents: ()=> dispatch(incrementNumberOfActiveEventsAction())}))

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);