interface IEvent {
    id: number
    title: string
}

type EventsState = {
    events: IEvent[]
}

type EventState = {
    event: IEvent | undefined
}

type EventAction = {
    type: string
    event: IEvent
}

type EventsAction = {
    type: string
    events: IEvent[]
}


type EventDispatchType = (args: EventAction) => EventAction;

type EventsDispatchType = (args: EventsAction) => EventsAction;