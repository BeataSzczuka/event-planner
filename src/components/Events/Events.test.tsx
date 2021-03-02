import React from 'react';
import { render, screen } from '@testing-library/react';
import Events from './Events';

test('renders learn react link', () => {
  render(<Events />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
