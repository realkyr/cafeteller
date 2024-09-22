import React, { useState } from 'react'
import { Col } from 'antd'
import { uploadImageService } from '@/services/media/images'
import CafeDetail from '@/components/Reviews/AddReviewController/_components/CafeDetail'
import { TAGS } from '@/components/Reviews/AddReviewController/constants'
import { Button } from '@/components/ui/MF'
import { Cafe } from '@/types'

import Editor from './EditorMF'
import { Instagram } from '@/icons'

const ReviewsEditor = () => {
  const [cafe, setCafe] = useState<Partial<Cafe>>({})
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

        <CafeDetail tags={TAGS} cafe={cafe} setCafe={setCafe} />
      </Col>
    </>
  )
}

export default ReviewsEditor
