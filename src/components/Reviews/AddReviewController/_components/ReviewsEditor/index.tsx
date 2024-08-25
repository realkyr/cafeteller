import React from 'react'
import { Col } from 'antd'
import { uploadImageService } from '@/services/media/images'
import dynamic from 'next/dynamic'

const Editor = dynamic(
  () => import('core_cafeteller/components').then((mod) => mod.Editor),
  { ssr: false }
)

const ReviewsEditor = () => {
  return (
    <>
      <Col className='px-28 py-5' span={18}>
        <Editor
          uploadCallback={async (file: File) => {
            return await uploadImageService(file)
          }}
        />
      </Col>

      <Col span={6}>
        <h1>ABC</h1>
      </Col>
    </>
  )
}

export default ReviewsEditor
