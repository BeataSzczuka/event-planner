interface IEvent {
  id: number;
  title: string;
  description: string;
  datetime: string;
  eventType: string;
  phoneNumber: string;
  email: string;
  place: string;
  image: any;
}

interface IEventForm {
  title: string;
  description: string;
  datetime: string;
  eventType: string;
  phoneNumber: string;
  email: string;
  place: string;
  image: any;
}

type EventsState = {
  events: IEvent[];
};

type EventState = {
  event: IEvent | undefined;
  message: string | undefined;
};

type EventAction = {
  type: string;
  payload: IEvent | IAddEvent;
};

type EventsAction = {
  type: string;
  payload: IEvent[];
};

type EventDispatchType = (args: EventAction) => EventAction;

type EventsDispatchType = (args: EventsAction) => EventsAction;
