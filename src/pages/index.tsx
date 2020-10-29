import React from 'react'
import dynamic from 'next/dynamic'

import MainLayout from '../layouts/main'

const ProSkeleton = dynamic(() => import('@ant-design/pro-skeleton'), {
  ssr: false,
})

export default function Home() {
  return (
    <MainLayout>
      <ProSkeleton key="placeholder"/>
    </MainLayout>
  )
}
