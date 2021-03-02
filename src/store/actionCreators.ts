import axios, { AxiosResponse } from "axios"
import * as actionTypes from "./actionTypes"

const baseAPIUrl = "http://localhost:3002/"

export function addEvent(event: IEvent) {
  return (dispatch: EventDispatchType) => {
        axios.post(baseAPIUrl.concat('events'), event).then((response: AxiosResponse) => {
            dispatch({type: actionTypes.ADD_EVENT, event: response.data})
        })
    }
}

export function getEvents() {
    return (dispatch: EventsDispatchType) => {
        axios.get(baseAPIUrl.concat('events')).then((response: AxiosResponse) => {
            dispatch({type: actionTypes.GET_EVENTS, events: response.data})
        })
    }
}

export function getEvent(id: number) {
    return (dispatch: EventDispatchType) => {
        axios.get(baseAPIUrl.concat(`event/${id}`)).then((response: AxiosResponse) => {
            dispatch({type: actionTypes.GET_EVENT, event: response.data})
        })
    }
}

