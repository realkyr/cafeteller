import React from 'react'
import dynamic from 'next/dynamic'
import { Typography } from 'antd'
import { useRouter } from 'next/router'

import {
  deleteDoc,
  doc,
  getFirestore,
  increment,
  setDoc
} from '@firebase/firestore'
import { Review } from '@/types'

const { Title } = Typography

const Modal = dynamic(
  () => import('core_cafeteller/components').then((mod) => mod.Modal),
  { ssr: false }
)

const DeleteModal = ({ open, onClose, reviews }: {
  open: boolean
  onClose: () => void
  reviews: Record<string, Review>
}) => {
  const router = useRouter()
  const id = router.query.id as string

  const onClickConfirm = async () => {
    const db = getFirestore()

    const reviewDocRef = doc(db, 'reviews', id)
    const cafeDocRef = doc(
      db,
      'cafes',
      reviews[id].cafe.id || ''
    )

    await deleteDoc(reviewDocRef)
    await deleteDoc(cafeDocRef)

    await setDoc(
      doc(db, 'meta', 'reviews'),
      {
        // +1
        amount: increment(-1)
      },
      { merge: true }
    )

    router.push('/')
  }

  return (
    <Modal onSuccess={onClickConfirm} onClose={onClose} isOpen={open}>
      <Title level={4}>ยืนยันการลบ ?</Title>
    </Modal>
  )
}

export default DeleteModal