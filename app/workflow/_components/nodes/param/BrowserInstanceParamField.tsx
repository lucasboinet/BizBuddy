'use client'

import { ParamProps } from '@/types/app-nodes';

function BrowserInstanceParamField({ param }: ParamProps) {

  return (
    <p className='text-xs'>{param.name}</p>
  )
}

export default BrowserInstanceParamField