import { describe, expect, it, vi } from 'vitest';
import { fireEvent, waitFor } from '@testing-library/react';
import AddUrlForm from '../AddUrlForm';
import { axiosMock, renderInCtx } from '@/lib/__tests__/utils';

describe('AddUrlForm', () => {
  it('creates a new URL entry', async () => {
    const onSuccess = vi.fn();
    axiosMock.onPost('/api/urls').reply(201, { id: 1, address: 'https://test.com', status: 'queued' });

    const screen = renderInCtx(<AddUrlForm onSuccess={onSuccess} />);
    fireEvent.click(screen.getByText('Add URL'));
    fireEvent.change(await screen.findByPlaceholderText('Enter URL'), {
      target: { value: 'https://test.com' },
    });
    fireEvent.click(screen.getByText('Add'));
    await waitFor(() => expect(onSuccess).toHaveBeenCalled());
  });
});
