import React from 'react'
import { Col } from 'antd'
import { uploadImageService } from '@/services/media/images'
import { TAGS } from '@/components/Reviews/AddReviewController/constants'
import { Button } from '@/components/ui/MF'
import { Instagram } from '@/icons'

import CafeDetail from '../CafeDetail'
import Editor from './EditorMF'
import CafeLocation from '@/components/Reviews/AddReviewController/_components/CafeLocation'

const ReviewsEditor = () => {
  const editorRef = React.useRef<any>(null)

  const onSave = async () => {
    console.log(await editorRef.current?.save())
  }

  return (
    <>
      <Col className='pl-20 py-5' span={15}>
        <Editor
          saveRef={editorRef}
          uploadCallback={async (file: File) => {
            return await uploadImageService(file)
          }}
        />
      </Col>

      <Col className='pr-8 py-5' span={9}>
        <Button
          onClick={() => {}}
          className='bg-pink-600 hover:bg-pink-700 text-white inline-flex items-center my-2'
        >
          <Instagram className='mr-2' />
          Load Post From Instagram
        </Button>

        <CafeLocation />

        <CafeDetail tags={TAGS} />
      </Col>
    </>
  )
}

export default ReviewsEditor
