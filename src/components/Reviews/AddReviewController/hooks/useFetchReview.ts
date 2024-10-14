import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useLoadingOverlay from '@/hooks/useLoadingOverlay'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { cafeAtom } from '@/components/Reviews/AddReviewController/atom/cafe'
import { useAtom } from 'jotai'
import { Cafe, Review } from '@/types'
import { reviewAtom } from '@/components/Reviews/AddReviewController/atom/review'

const useFetchReview = () => {
  const query = useRouter().query
  const id = query.id as string
  const showLoading = useLoadingOverlay()
  const [, setCafeData] = useAtom(cafeAtom)
  const [, setReviewData] = useAtom(reviewAtom)

  useEffect(() => {
    const fetchReview = async () => {
      if (id) {
        try {
          showLoading(true)

          const db = getFirestore()

          // Fetch the review document
          const reviewDocRef = doc(db, 'reviews', id)
          const reviewSnap = await getDoc(reviewDocRef)

          if (reviewSnap.exists()) {
            const reviewData = reviewSnap.data()
            setReviewData(reviewData as Review)

            // If there's a reference to cafe, fetch the referenced document
            if (reviewData.cafe) {
              const cafeRef = reviewData.cafe
              const cafeSnap = await getDoc(cafeRef)
              if (cafeSnap.exists()) {
                setCafeData({
                  id: cafeSnap.id,
                  ...(cafeSnap.data() || {})
                } as Cafe)
              }
            }
          } else {
            console.log('No such review found!')
          }
        } catch (error) {
          console.error('Error fetching review or cafe:', error)
        } finally {
          showLoading(false)
        }
      } else {
        setCafeData({})
        setReviewData({})
      }
    }

    fetchReview().then()
  }, [id])
}

export default useFetchReview
