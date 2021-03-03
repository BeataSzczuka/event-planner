import React from 'react';
import { render, screen } from '@testing-library/react';
import Event from './Event';

test('renders learn react link', () => {
  render(<Event id={'1'} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
