import React from 'react';
import { render } from '@testing-library/react';
import EventBrief, { EventBriefProps } from './EventBrief';

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

const props: EventBriefProps = {
  event: exampleEvent,
};

describe('EventBrief component', () => {
  let container: any;
  beforeEach(() => {
    container = render(<EventBrief {...props} />).container;
  });

  test('shows title', () => {
    const header = container.querySelector('.header span');
    expect(header.textContent).toEqual(props.event.title);
  });

  test('shows description', () => {
    const element = container.querySelector('#description');
    expect(element.textContent).toEqual(props.event.description);
  });

  test('shows details about event', () => {
    const element = container.querySelectorAll('#details .detail');
    expect(element[0].textContent).toContain(props.event.place);
    expect(element[1].textContent).toContain(props.event.eventType);
  });
});
