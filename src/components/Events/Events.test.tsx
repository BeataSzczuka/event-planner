import React from 'react';
import { render } from '@testing-library/react';
import { Events, EventsProps } from './Events';
import { BrowserRouter } from 'react-router-dom';

const exampleEvent: IEvent = {
  id: 1,
  title: 'title',
  description: 'descr',
  datetime: '2021-03-23T11:00',
  eventType: 'Sport',
  phoneNumber: '123456789',
  email: 'email@email.com',
  place: 'anywhere',
  image: 'image.png',
};

const props: EventsProps = {
  events: [exampleEvent, { ...exampleEvent, id: 2 }],
  getEvents: () => (_: EventsDispatchType) => {},
};

describe('Events component', () => {
  let container: any;
  beforeEach(() => {
    container = render(
      <BrowserRouter>
        <Events {...props} />
      </BrowserRouter>,
    ).container;
  });

  test('renders title', () => {
    const header = container.querySelector('.header h1');
    expect(header?.textContent).toEqual('Wydarzenia');
  });

  test('renders add event button', () => {
    const button = container.querySelector('#add-event-btn');
    expect(button?.textContent).toEqual('Dodaj wydarzenie');
  });

  test('renders events', () => {
    const eventsContainer = container.querySelector('.cards-container').children;
    expect(eventsContainer.length).toEqual(props.events.length);
  });
});
