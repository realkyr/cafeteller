import React, { useState } from 'react'
import { Col } from 'antd'
import { uploadImageService } from '@/services/media/images'
import dynamic from 'next/dynamic'
import CafeDetail from '@/components/Reviews/AddReviewController/_components/CafeDetail'
import { Cafe } from '@/types'
import { TAGS } from '@/components/Reviews/AddReviewController/constants'

const Editor = dynamic(
  () => import('core_cafeteller/components').then((mod) => mod.Editor),
  { ssr: false }
)

const ReviewsEditor = () => {
  const [cafe, setCafe] = useState<Partial<Cafe>>({})

  return (
    <>
      <Col className='pl-14 py-5' span={15}>
        <Editor
          uploadCallback={async (file: File) => {
            return await uploadImageService(file)
          }}
        />
      </Col>

      <Col className='pr-8 py-5' span={9}>
        <CafeDetail tags={TAGS} cafe={cafe} setCafe={setCafe} />
      </Col>
    </>
  )
}

export default ReviewsEditor
