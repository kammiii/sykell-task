import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

const queryClient = new QueryClient();

interface RenderOptions {
  withRouter?: boolean;
  initialEntries?: string[];
}

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

export default TestProviders;