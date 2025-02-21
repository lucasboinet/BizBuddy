import { ModeToggle } from '@/components/ThemeModeToggle'
import { Separator } from '@/components/ui/separator'
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen'>
      <div className='flex flex-col flex-1 min-h-screen'>
        <header className='flex items-center justify-between px-6 py-4 h-[50px]'>
          <div className='gap-1 flex items-center'>
            <ModeToggle />
          </div>
        </header>
        <Separator />
        <div className='overflow-auto p-6 space-y-4'>
          <h1 className='text-lg font-semibold md:text-2xl'>Dashboard</h1>
          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default layout