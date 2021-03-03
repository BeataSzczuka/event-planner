import axios, { AxiosResponse } from 'axios';
import * as actionTypes from './actionTypes';

const baseAPIUrl = 'http://localhost:3002/';

export function addEvent(event: IEventForm) {
  return (dispatch: EventDispatchType) => {
    axios
      .post(baseAPIUrl.concat('events'), event)
      .then((response: AxiosResponse) => {
        dispatch({ type: actionTypes.ADD_EVENT, payload: 'Wydarzenie zostało utworzne' });
      })
      .catch(() => {
        dispatch({ type: actionTypes.ADD_EVENT, payload: 'Nie udało się dodać wydarzenia' });
      });
  };
}

export function clearMessage() {
  return (dispatch: EventDispatchType) => {
    dispatch({ type: actionTypes.CLEAR_MESSAGE, payload: undefined });
  };
}

export function getEvents() {
  return (dispatch: EventsDispatchType) => {
    axios.get(baseAPIUrl.concat('events')).then((response: AxiosResponse) => {
      dispatch({ type: actionTypes.GET_EVENTS, payload: response.data });
    });
  };
}

export function getEvent(id: number) {
  return (dispatch: EventDispatchType) => {
    axios.get(baseAPIUrl.concat(`event/${id}`)).then((response: AxiosResponse) => {
      dispatch({ type: actionTypes.GET_EVENT, payload: response.data });
    });
  };
}
