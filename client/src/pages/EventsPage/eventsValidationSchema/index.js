import * as Yup from "yup";
import moment from "moment";

const EVENT_NAME_PATTERN = /[a-zA-Zа-яА-Я0-9]{3,32}/
const eventNameWarningMessage = 'Event name must contains minimum 3 latin letters';
const eventDateWarningMessage = 'Event must starts minimum in 1 minute from the current time';
const notifyMinDateWarningMessage = 'Notify cannot be called before min possible eventTime';
const nofifyMaxDateWarningMessage = 'Notify can be called only before eventTime';

const minTime = moment(new Date()).add(1, 'minute').toDate();


export const eventsValidationSchema = Yup.object().shape({
    eventName: Yup.string().required().label('eventName').matches(EVENT_NAME_PATTERN, eventNameWarningMessage),
    eventDate: Yup.date().required().label('eventDate').min(minTime,eventDateWarningMessage ),
    notifyDate: Yup.date().required().label('notifyDate').min(minTime, notifyMinDateWarningMessage).when('eventDate', (eventDate, schema) => eventDate && schema.max(eventDate, nofifyMaxDateWarningMessage))
})