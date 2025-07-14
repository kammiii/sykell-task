import { render } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { ReactElement } from 'react';
import api from '../api/client';
import TestProviders from './providers';

interface RenderOptions {
  withRouter?: boolean;
  initialEntries?: string[];
}


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
