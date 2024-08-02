import React, { useEffect } from 'react'
import axios from '../utils/axios'
import {message} from "antd";

const useSimilarCafe = ({ tags, id }) => {
  const [similarCafe, setSimilarCafe] = React.useState(null)

  useEffect(() => {
    const getSimilarCafe = async () => {
      setSimilarCafe(null)
      try {
        const similarCafe = await axios.get('/get-similar-cafe', {
          params: {
            tags
          }
        })
        setSimilarCafe(similarCafe.data?.reviews?.filter(review => id !== review.id) || [])
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
