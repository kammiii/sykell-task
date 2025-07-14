import { describe, expect, it } from 'vitest';
import { fireEvent } from '@testing-library/react';
import { axiosMock, renderInCtx } from '@/lib/__tests__/utils';
import Login from '../Login';

describe('Login Form', () => {
  it('logs in a user', async () => {
    axiosMock.onPost('/api/auth/login').reply(200, {
      token: 'test-token',
      user: { id: 1, name: 'John Doe', created_at: new Date().toISOString() },
    });

    const screen = renderInCtx(<Login />, { withRouter: true });
    await screen.findByText('Welcome enter your name to sign in');
    fireEvent.change(screen.getByPlaceholderText('John Doe'), {
      target: { value: 'John Doe' },
    });
    fireEvent.click(screen.getByText('Continue'));
    expect(window.location.pathname).toBe('/');
  });
});
