import { combineReducers } from 'redux';
import * as actionTypes from './actionTypes';

const initialEventsState: EventsState = {
  events: [],
};

const initialEventState: EventState = {
  event: undefined,
};

const eventsReducer = (
  state: EventsState = initialEventsState,
  action: EventsAction,
): EventsState => {
  switch (action.type) {
    case actionTypes.GET_EVENTS:
      return {
        ...state,
        events: action.events,
      };
  }
  return state;
};

const eventReducer = (state: EventState = initialEventState, action: EventAction): EventState => {
  console.log('here');
  switch (action.type) {
    case actionTypes.GET_EVENT:
      console.log(action);
      return {
        ...state,
        event: action.event,
      };
    case actionTypes.ADD_EVENT:
      const newEvent: IEvent = {
        id: Math.random(),
        title: action.event.title,
      };
      return {
        ...state, // ???
      };
  }
  console.log(state);
  return state;
};

export default combineReducers({
  eventsReducer: eventsReducer,
  eventReducer: eventReducer,
});
