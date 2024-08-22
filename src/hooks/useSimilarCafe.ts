import React, { useEffect } from 'react'
import axios from '@/utils/axios'
import { message } from 'antd'
import { Review } from '@/types'

interface SimilarCafeProps {
  id: string
  tags: string[]
}

const useSimilarCafe = ({ tags, id }: SimilarCafeProps) => {
  const [similarCafe, setSimilarCafe] = React.useState<Review[] | null>(null)

  useEffect(() => {
    const getSimilarCafe = async () => {
      setSimilarCafe(null)
      try {
        const similarCafe = await axios.get('/get-similar-cafe', {
          params: {
            tags
          }
        })
        setSimilarCafe(
          similarCafe.data?.reviews?.filter(
            (review: Review) => id !== review.id
          ) || []
        )
      } catch (error) {
        if (tags && tags.length > 0) {
          message.warning('Failed to get More Like This cafe')
        }
      }
    }

    getSimilarCafe().then()
  }, [id])

  return { similarCafe }
}

export default useSimilarCafe
