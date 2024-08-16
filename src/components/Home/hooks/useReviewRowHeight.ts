import React from 'react'
import useViewport from '@/hooks/useViewport'
import { breakpoints } from '@/utils/breakpoints'

const ROW_HEIGHTS = {
  md: 320 + 16,
  lg: 400 + 32,
  default: 240 + 16
}

const useReviewRowHeight = () => {
  const [rowHeight, setRowHeight] = React.useState(ROW_HEIGHTS.default)
  const viewport = useViewport()

  React.useEffect(() => {
    if (viewport.width >= breakpoints.lg) {
      setRowHeight(ROW_HEIGHTS.lg)
    } else if (viewport.width >= breakpoints.md) {
      setRowHeight(ROW_HEIGHTS.md)
    } else {
      setRowHeight(ROW_HEIGHTS.default)
    }
  }, [viewport])

  return rowHeight
}

export default useReviewRowHeight
