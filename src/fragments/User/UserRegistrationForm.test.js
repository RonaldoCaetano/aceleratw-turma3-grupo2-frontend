import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UserRegistrationForm from './UserRegistrationForm';

import { BASE_URL } from 'api/config';

beforeAll(() => jest.spyOn(window, 'fetch'));

describe('<UserRegistrationForm />', () => {
  it('should make login', async () => {
    render(<UserRegistrationForm />);
    const formData = JSON.stringify({
      name: '',
      password: '',
    });

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    userEvent.click(screen.getByRole('button', { name: /Cadastrar/i }));

    expect(window.fetch).toHaveBeenCalledWith(
      `${BASE_URL}/users`,
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: formData,
      })
    );

    expect(window.fetch).toHaveBeenCalledTimes(1);
  });
});
