import ACTION from '../actions/actionTypes';
import _ from 'lodash';

const initialState = {
    eventsArr: [],
    numberOfActiveEvents: 0
};


export default function (state = initialState, action) {

    switch (action.type) {
        case ACTION.NEW_EVENT_ACTION:
        {
            const {eventsArr} = state;
            const {newEvent} = action;
            const newState = [...eventsArr, newEvent];
            newState.sort((prev,next) => prev.eventDate - next.eventDate)
            return  {
                ...state,
                eventsArr: newState
            }
        }

        case ACTION.INCREMENT_NUMBER_OF_ACTIVE_EVENTS_ACTION:
        {
            const {numberOfActiveEvents} = state;
            console.log(numberOfActiveEvents)
            let numberOfActiveEventsClone = _.clone(numberOfActiveEvents)
            numberOfActiveEventsClone++
            return {
                ...state,
                numberOfActiveEvents: numberOfActiveEventsClone
            }
        }

        default:
            return state;
    }
}

