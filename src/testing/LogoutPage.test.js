import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LogoutPage from '../LogoutPage/LogoutPage';

describe('LogoutPage component', () => {
  it('renders without crashing', () => {
    render(<LogoutPage />);
  });

  it('calls onLogout prop when the logout button is clicked', () => {
    // Mock the onLogout function
    const onLogoutMock = jest.fn();

    // Render the LogoutPage component with the mock function
    const { getByText } = render(<LogoutPage onLogout={onLogoutMock} />);

    // Find the logout button and simulate a click
    const logoutButton = getByText('Logout');
    fireEvent.click(logoutButton);

    // Check if the onLogout function is called
    expect(onLogoutMock).toHaveBeenCalledTimes(1);
  });
});
