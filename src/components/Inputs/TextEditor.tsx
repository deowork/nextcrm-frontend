import React from 'react'
import dynamic from 'next/dynamic'
import { Skeleton } from '@mantine/core'

export default dynamic(() => import('@mantine/rte'), {
  ssr: false,
  loading: () => <Skeleton height={100} />,
})
