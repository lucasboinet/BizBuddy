import { AppSidebar } from '@/components/app-sidebar'
import { AuthSessionContextProvider } from '@/components/context/AuthSessionContext'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthSessionContextProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
            </div>
          </header>

          <div className='px-4 pb-4 overflow-auto h-full'>
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthSessionContextProvider>
  )
}

export default layout