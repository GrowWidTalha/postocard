import { getDesignById } from '@/features/designs/actions/designs.actions'
import React from 'react'
import DesignPageClient from './designPageClient'

const DesignPage = async({ searchParams}: { searchParams: Promise<{id: string}>}) => {
    const {id} = await searchParams
    const design = await getDesignById(id)
    if(!design) return null
  return (
    <div>
        <DesignPageClient design={design}  />
    </div>
  )
}

export default DesignPage
