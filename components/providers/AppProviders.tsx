'use client'

import { ThemeProvider } from "next-themes"
import { useState } from "react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NextToploader from 'nextjs-toploader';

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <NextToploader color="#000" showSpinner={false} />
      <ThemeProvider attribute='class' defaultTheme="light" enableSystem>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}