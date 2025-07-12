import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import api from '../api/client';

interface RenderOptions {
  withRouter?: boolean;
  initialEntries?: string[];
}

const queryClient = new QueryClient();

const TestProviders = ({
  children,
  withRouter = false,
  initialEntries
}: { children?: ReactNode } & RenderOptions) => {
  const content = (
    <QueryClientProvider client={queryClient}>
      {withRouter ? <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter> : children}
    </QueryClientProvider>
  );

  return content;
};

export const renderInCtx = (children: ReactElement, opts?: RenderOptions) => {
  const { rerender, ...rest } = render(
    <TestProviders {...opts}>{children}</TestProviders>
  );
  return {
    ...rest,
    rerender: (children: ReactElement) =>
      rerender(<TestProviders {...opts}>{children}</TestProviders>),
  };
};

export const axiosMock = new MockAdapter(api, {
  onNoMatch: 'throwException',
});
