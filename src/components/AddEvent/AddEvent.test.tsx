import React from 'react';
import { render, screen } from '@testing-library/react';
import { AddEvent, AddEventProps } from './AddEvent';
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

const props: AddEventProps = {
  message: '',
  addEvent: () => (_) => {},
  clearMessage: () => (_) => {},
};

describe('AddEvent component', () => {
  let container: any;
  beforeEach(() => {
    container = render(
      <BrowserRouter>
        <AddEvent {...props} />
      </BrowserRouter>,
    ).container;
  });

  test('shows title', () => {
    const header = container.querySelector('.AddEvent h1');
    expect(header.textContent).toEqual('dodaj wydarzenie');
  });

  test('shows back button', () => {
    const button = container.querySelector('button#back-btn');
    expect(button?.textContent).toContain('Wroć do listy wydarzeń');
  });
});
