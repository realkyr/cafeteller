import React from 'react'
import admin from 'plugins/firebase'
import PropTypes from 'prop-types'

import Editor from 'components/reviews/Editor'
import { useRouter } from 'next/router'

export default function EditReview (props) {
  const router = useRouter()
  const prev = () => {
    router.push('/reviews/' + props.review.id)
  }
  return (
    <Editor
      prev={prev}
      save={prev}
      edit={{
        review: props.review,
        cafe: props.cafe
      }}
    />
  )
}

EditReview.propTypes = {
  // ...prop type definitions here
  review: PropTypes.object,
  cafe: PropTypes.object
}

// This function gets called at build time
export async function getServerSideProps (context) {
  // Call an external API endpoint to get posts
  const db = admin.firestore()
  console.log(context.params)
  const reviewDoc = await db.collection('reviews').doc(context.params.id).get()
  const review = reviewDoc.data()
  review.id = reviewDoc.id

  const cafeDoc = await review.cafe.get()
  delete review.cafe
  const cafe = cafeDoc.data()
  cafe.id = cafeDoc.id

  // convert all timestamp to date
  review.createDate = review.createDate.toString()
  review.updateDate = review.updateDate.toString()
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      review,
      cafe
    }
  }
}
