import { useMemo, useState } from 'react'
import useSWR from 'swr'
import { getReviewsService } from '@/services/list'
import { DisplayReviewRow, Review } from '@/types'
import { breakpoints } from '@/utils/breakpoints'
import useViewport from '@/hooks/useViewport'

function sortAndRemoveDuplicates(items: Review[]): Review[] {
  const uniqueItemsMap = new Map<string, Review>()

  items.forEach((item) => {
    const existingItem = uniqueItemsMap.get(item.id)
    if (
      !existingItem ||
      new Date(item.updateDate) > new Date(existingItem.updateDate)
    ) {
      uniqueItemsMap.set(item.id, item)
    }
  })

  return Array.from(uniqueItemsMap.values()).sort(
    (a, b) =>
      new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime()
  )
}

const useReviewsList = (key?: string) => {
  const [data, setData] = useState<Review[]>([])
  const [updateDate, setUpdateDate] = useState<string>()

  const { isLoading, error } = useSWR(
    [key || 'getReviewsList', updateDate],
    () => getReviewsService(updateDate),
    {
      onSuccess: (data) => {
        setData((prev) => {
          if (!data || data.length === 0) {
            return prev
          }
          return sortAndRemoveDuplicates([...prev, ...data])
        })
      }
    }
  )

  const viewport = useViewport()

  const rows: DisplayReviewRow[] = useMemo(() => {
    const _data: DisplayReviewRow = []

    const perRow = viewport.width < breakpoints.lg ? 2 : 3
    if (data) _data.push(...data)

    const result: DisplayReviewRow[] = []
    for (let i = 0; i < _data.length; i += perRow) {
      result.push(_data.slice(i, i + perRow))
    }

    return result
  }, [data, viewport])

  return { data, rows, isLoading, error, setUpdateDate }
}

export default useReviewsList
