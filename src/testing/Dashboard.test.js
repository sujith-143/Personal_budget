import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'; // Add this import
import Dashboard from '../Dashboard/Dashboard';

test('renders dashboard with buttons', () => {
  render(
    <Router>
      <Dashboard />
    </Router>
  );

  // Check if the heading is present
  const headingElement = screen.getByText(/This is Dashboard Page/i);
  expect(headingElement).toBeInTheDocument();
});
