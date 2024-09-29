import React from 'react'
import { Col } from 'antd'
import { uploadImageService } from '@/services/media/images'
import { TAGS } from '@/components/Reviews/AddReviewController/constants'

import CafeDetail from '../CafeDetail'
import Editor from './EditorMF'
import CafeLocation from '@/components/Reviews/AddReviewController/_components/CafeLocation'
import IGModal from '@/components/Reviews/AddReviewController/_components/IGModal'
import { IGPost } from '@/components/Reviews/types'
import { convertIGToBlock } from '@/components/Reviews/AddReviewController/_components/IGModal/helper'
import { Button } from '@/components/ui/MF'

const ReviewsEditor = () => {
  const editorRef = React.useRef<any>(null)

  const onSave = async () => {
    console.log(await editorRef.current?.save())
  }

  const onLoadPostInstagram = async (data: IGPost) => {
    const convertedData = await convertIGToBlock(data)

    const editor = editorRef.current.getEditorRef()
    console.log(convertedData)
    editor.blocks.insertMany(convertedData.blocks)
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
        <div className='flex items-center'>
          <IGModal onSelect={onLoadPostInstagram} />

          <Button
            onClick={onSave}
            type='primary'
            className='inline-flex items-center mx-2'
          >
            Save
          </Button>
        </div>

        <CafeLocation />

        <CafeDetail tags={TAGS} />
      </Col>
    </>
  )
}

export default ReviewsEditor
