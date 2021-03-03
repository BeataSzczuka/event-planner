import axios, { AxiosResponse } from 'axios';
import * as actionTypes from './actionTypes';

const baseAPIUrl = 'http://localhost:3002/';
export const APIUrlImage = baseAPIUrl.concat('image/');

function mapEventToFormData(event: IEventForm) {
  const formData = new FormData();
  if (event.image) formData.append('image', event.image, event.image.name);
  formData.append('title', event.title);
  formData.append('description', event.description);
  formData.append('datetime', event.datetime);
  formData.append('eventType', event.eventType);
  formData.append('phoneNumber', event.phoneNumber);
  formData.append('email', event.email);
  formData.append('place', event.place);
  return formData;
}

export function addEvent(event: IEventForm) {
  return (dispatch: EventDispatchType) => {
    axios
      .post(baseAPIUrl.concat('events'), mapEventToFormData(event), {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
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
