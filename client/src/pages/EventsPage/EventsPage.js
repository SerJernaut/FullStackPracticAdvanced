import React from 'react';
import EventsForm from "./EventsComponents/EventsForm/EventsForm";
import EventsList from "./EventsComponents/EventsList/EventsList";
import styles from './EventsPage.module.sass';
import {Link} from "react-router-dom";
import Button from "./EventsComponents/Button/Button";


const EventsPage = () => {
    return (
        <div className={styles.eventsPageContainer}><EventsList/>
            <EventsForm/>
            <Button><Link to={'/'}>go to home page</Link></Button>
        </div>

    );
};

export default EventsPage;