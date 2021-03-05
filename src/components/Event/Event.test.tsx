import React from 'react';
import { render } from '@testing-library/react';
import { Event, EventProps } from './Event';
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

const props: EventProps = {
  event: exampleEvent,
  getEvent: () => (_) => {},
  id: exampleEvent.id.toString(),
};

describe('Event component', () => {
  let container: any;
  beforeEach(() => {
    container = render(
      <BrowserRouter>
        <Event {...props} />
      </BrowserRouter>,
    ).container;
  });

  test('shows title', () => {
    const header = container.querySelector('#about-event h1');

    expect(header.textContent).toEqual(props.event?.title);
  });

  test('shows back button', () => {
    const button = container.querySelector('button');
    expect(button?.textContent).toEqual('Wroć do listy wydarzeń');
  });
});
