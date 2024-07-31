import React, { useEffect } from 'react'
import axios from '../../../utils/axios'

const useSimilarCafe = ({ tags, id }) => {
  const [similarCafe, setSimilarCafe] = React.useState(null)

  useEffect(() => {
    const getSimilarCafe = async () => {
      setSimilarCafe(null)
      const similarCafe = await axios.get('/get-similar-cafe', {
        params: {
          tags
        }
      })
      setSimilarCafe(similarCafe.data?.reviews?.filter(review => id !== review.id) || [])
    }

    getSimilarCafe().then()
  }, [id])

  return { similarCafe }
}

export default useSimilarCafe
