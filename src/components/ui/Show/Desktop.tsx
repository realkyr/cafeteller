import React, { ReactNode } from 'react'
import useViewport from '@/hooks/useViewport'
import { breakpoints } from '@/utils/breakpoints'
import Show from '@/components/ui/Show/index'

const Desktop = ({ children }: { children: ReactNode }) => {
  const { width } = useViewport() // 992
  const isDesktop = width >= breakpoints.lg
  return <Show when={isDesktop}>{children}</Show>
}

export default Desktop
