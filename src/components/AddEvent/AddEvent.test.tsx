import React from 'react';
import { render, screen } from '@testing-library/react';
import AddEvent from './AddEvent';

test('renders learn react link', () => {
  render(<AddEvent />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
