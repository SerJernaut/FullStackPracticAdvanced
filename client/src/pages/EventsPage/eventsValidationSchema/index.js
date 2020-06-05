import * as Yup from "yup";
import moment from "moment";

const EVENT_NAME_PATTERN = /[a-zA-Zа-яА-Я0-9]{3,24}/
const eventNameWarningMessage = 'Event name must contains minimum 3 and maximum 24 latin letters or numbers';
const eventDateWarningMessage = 'Event must starts minimum in 2 minutes from the current time';
const notifyMinDateWarningMessage = 'Notify can be called only minimum in 1 minute from currentTime';
const nofifyMaxDateWarningMessage = 'Notify can not be called after event';


const minPossibleEventTime = moment(new Date()).add(2, 'minutes').toDate();
const minPossibleNotifyTime = moment(new Date()).add(1, 'minutes').toDate();

export const eventsValidationSchema = Yup.object().shape({
    eventName: Yup.string().required().label('eventName').matches(EVENT_NAME_PATTERN, eventNameWarningMessage),
    eventDate: Yup.date().required().label('eventDate').min(minPossibleEventTime,eventDateWarningMessage ),
    notifyDate: Yup.date().required().label('notifyDate').min(minPossibleNotifyTime, notifyMinDateWarningMessage).when('eventDate', (eventDate, schema) => eventDate && schema.max(eventDate, nofifyMaxDateWarningMessage))
})