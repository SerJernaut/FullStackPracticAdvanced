import React from 'react';
import EventsForm from "./EventsComponents/EventsForm/EventsForm";
import EventsList from "./EventsComponents/EventsList/EventsList";
import styles from './EventsPage.module.sass';
import {Link} from "react-router-dom";
import Button from "./EventsComponents/Button/Button";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";


const EventsPage = () => {
    return (
        <div className={styles.eventsPageContainer}><EventsList/>
            <EventsForm/>
            <Button><Link to={'/'}>go to home page</Link></Button>
            <ButtonGroup/>
        </div>

    );
};

export default EventsPage;