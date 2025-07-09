import { StrictMode } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner';
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
  <StrictMode>
    <Toaster richColors position="top-right" />
    <RouterProvider router={router} />
  </StrictMode>,
  </QueryClientProvider>
)
