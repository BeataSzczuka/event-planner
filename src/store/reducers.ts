import { combineReducers } from 'redux';
import * as actionTypes from './actionTypes';

const initialEventsState: EventsState = {
  events: [],
};

const initialEventState: EventState = {
  event: undefined,
  message: undefined,
};

const eventsReducer = (
  state: EventsState = initialEventsState,
  action: EventsAction,
): EventsState => {
  switch (action.type) {
    case actionTypes.GET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
  }
  return state;
};

const eventReducer = (state: EventState = initialEventState, action: EventAction): EventState => {
  switch (action.type) {
    case actionTypes.GET_EVENT:
      return {
        ...state,
        event: action.payload,
      };
    case actionTypes.ADD_EVENT:
      return {
        ...state,
        message: action.payload,
      };
    case actionTypes.CLEAR_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
  }
  return state;
};

export default combineReducers({
  eventsReducer: eventsReducer,
  eventReducer: eventReducer,
});
