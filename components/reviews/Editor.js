import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { InboxOutlined, LoadingOutlined, LeftOutlined, SaveOutlined } from '@ant-design/icons'
import Banner from './Banner'

import SimpleVideo from 'plugins/Video/index'
import upload from 'plugins/Video/upload'
import { igToBlock } from 'plugins/customfunc'

const { Row, Col, Upload, message, Image, Spin, Button, Space } = require('antd')
const { Dragger } = Upload

const componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'long_name',
  administrative_area_level_2: 'short_name',
  sublocality_level_1: 'short_name',
  sublocality_level_2: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
}

const restrictCountry = { country: ['th', 'au', 'jp'] }

export default function Editor (props) {
  const [banner, setBanner] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cafe, setCafe] = useState({
    location_data: {
      province: {},
      district: {}
    },
    placeData: {},
    district: '',
    subdistrict: '',
    selectedTags: []
  })

  const content = async (post) => {
    const content = {}
    content.blocks = []

    // split caption block in to an array
    let caption = post.caption.split('\n\n')

    // /*
    // header of reviews if there is no header on ig : ชื่อรีวิว instead
    // */
    let header = 'ชื่อรีวิว'
    if (caption[0].includes('\n')) {
      const buffer = caption[0].split('\n')
      caption.shift()
      header = buffer.shift()
      caption = [...buffer, ...caption]
    }

    // push header in to content's block
    content.blocks.push({
      type: 'header',
      data: {
        text: header,
        level: 2
      }
    })
    // content.caption = caption

    // convert ig image, video and carousel to block
    const igBlock = await igToBlock(post)

    content.blocks = [
      ...content.blocks,
      ...caption.map((text) => {
        return {
          type: 'paragraph',
          data: {
            text: text.replace(/&#8232;/g, ' ')
          }
        }
      })
    ]

    if (Array.isArray(igBlock)) {
      content.blocks = [...igBlock, ...content.blocks]
    } else {
      content.blocks = [igBlock, ...content.blocks]
    }
    return content
  }

  let editor
  useEffect(() => {
    const didMount = async () => {
      setLoading(true)
      const EditorJS = require('@editorjs/editorjs')
      const Header = require('@editorjs/header')
      const List = require('@editorjs/list')
      const ImageTool = require('@editorjs/image')
      try {
        const data = props.selected === undefined ? {} : await content(props.posts.data[props.selected])
        if (document.getElementById('codex-editor')) {
          editor = new EditorJS({
          /**
           * Id of Element that should contain Editor instance
           */
            holder: 'codex-editor',
            tools: {
              header: { class: Header, inlineToolbar: true },
              list: List,
              image: {
                class: ImageTool,
                config: {
                // config uploader of image module
                  uploader: {
                    uploadByFile: async (file) => {
                      const uploadedFile = await upload(file, 'images')
                      return uploadedFile
                    },
                    uploadByUrl: async (file) => {
                      const image = await file
                      return {
                        success: 1,
                        file: {
                          url: image
                        }
                      }
                    }
                  }
                }
              },
              video: SimpleVideo
            },
            placeholder: 'เขียนรีวิวที่นี่!',
            autofocus: true,
            // any ig post selected? empty content, convert caption to content otherwise
            data
          })
        }
        setLoading(false)
      } catch (error) {
        message.error('load ไม่สำเร็จ')
      }
    }
    didMount()
    return () => { editor && editor.destroy && editor.destroy() }
  }, [])

  // eslint-disable-next-line no-unused-vars
  const saveReview = async () => {
    // save reviews to database
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const review = await editor.save()
    const cafeData = this.$refs.cafe.placeData
    cafeData.tags = this.$refs.cafe.selectedTags

    Object.keys(cafeData).forEach((key) => {
      if (typeof cafeData[key] === 'string') {
        cafeData[key] = cafeData[key].replace(/&#8232;/g, ' ')
      }
    })

    let path = '/review'
    if (this.$route.name === 'review-id-edit') {
      path += '/' + this.$route.params.id
    }
    cafeData.banner = this.banner ? this.banner : {}
    console.log(cafeData)
    const res = await this.$axios.post(
      path,
      JSON.stringify({
        access_token: localStorage.getItem('access_token'),
        post: {
          review,
          cafe: cafeData
        }
      }),
      config
    )
    console.log(res.data)
    this.$router.push('/review/' + res.data)
  }

  const draggerProps = {
    name: 'file',
    async customRequest ({ file, onSuccess, onError }) {
      try {
        const res = await upload(file, 'Image')
        setBanner(res.file.url)
        onSuccess('done')
      } catch (error) {
        onError(() => {
          if (error.response) {
            message.error(error.response.data.error_message)
          } else {
            message.error(error.message)
          }
        })
      }
    },
    onChange (info) {
      const { status } = info.file
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }
  }
  const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />

  return (
    <>
      <Col xs={24}>
        {
          banner
            ? <Banner>
                <Image height={'100%'} width={'100%'} style={{ objectFit: 'cover' }} onError={(e) => { e.target.onerror = null; e.target.src = '/assets/Images/placeholder.png' }}
                  alt={'banner'} src={banner} fallback="/assets/Images/placeholder.png" preview={false}
                />
              </Banner>
            : null
        }
        <Dragger {...draggerProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag image to this area to upload</p>
          <p className="ant-upload-hint">
            Support banner for scale 3:4
          </p>
        </Dragger>
      </Col>

      <Col xs={24} md={22} style={{ marginTop: 20 }}>
        <Space size="small" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={props.prev} icon={<LeftOutlined />} />
          <Button type="primary" onClick={props.save} icon={<SaveOutlined />}>บันทึก</Button>
        </Space>
      </Col>
      <Col xs={24} md={22}>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <div className="editor-section">
              <div id="codex-editor" style={{ marginTop: 20 }} className="th"></div>
            </div>
            {
              loading
                ? <Spin indicator={antIcon} />
                : null
            }
          </Col>
          <Col xs={24} lg={12}></Col>
        </Row>
      </Col>
    </>
  )
}

Editor.propTypes = {
  // ...prop type definitions here
  posts: PropTypes.object,
  selected: PropTypes.number,
  prev: PropTypes.func,
  save: PropTypes.func
}
