import React, { ReactNode } from 'react'
import useViewport from '@/hooks/useViewport'
import { breakpoints } from '@/utils/breakpoints'
import Show from '@/components/ui/Show/index'

const Mobile = ({ children }: { children: ReactNode }) => {
  const { width } = useViewport() // 992
  const isMobile = width < breakpoints.lg
  return <Show when={isMobile}>{children}</Show>
}

export default Mobile
