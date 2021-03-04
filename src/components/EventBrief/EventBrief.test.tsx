import React from 'react';
import { render, screen } from '@testing-library/react';
import EventBrief from './EventBrief';

test('renders learn react link', () => {
  render(<EventBrief event={{} as IEvent} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
