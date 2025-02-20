import Link from 'next/link'
import React from 'react'

function NotFoundPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <div className='text-center'>
          <span>not found</span>
          <Link href={'/'} className='flex justify-center underline'>
            back
          </Link>
      </div>
    </div>
  )
}

export default NotFoundPage