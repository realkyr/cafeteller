import { IGPost } from '@/components/Reviews/types'
import axios from '@/utils/axios'

export const convertImageToBlock = async (post: IGPost) => {
  switch (post.media_type) {
    case 'IMAGE': {
      const formData = new FormData()
      formData.append('url', post.media_url)

      const res = await axios.post('/media/ig/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      // timestamp
      const id = new Date().getTime()
      return {
        type: 'image',
        data: [
          {
            src: {
              id,
              urls: {
                '@1980': res.data.file.url,
                '@1024': res.data.file.url,
                '@720': res.data.file.url
              }
            },
            caption: ''
          }
        ]
      }
    }
    case 'VIDEO': {
      return ''
      // const resv = await axios.post(
      //   '/api/instagram/upload',
      //   JSON.stringify({
      //     access_token: localStorage.getItem('access_token'),
      //     url: post.media_url
      //   }),
      //   config
      // )
      // return {
      //   type: 'video',
      //   data: {
      //     file: {
      //       url: resv.data.file.url
      //     }
      //   }
      // }
    }
    case 'CAROUSEL_ALBUM': {
      const response = await axios.get(
        `https://graph.instagram.com/${
          post.id
        }/children?fields=thumbnail_url,id,media_url,media_type,permalink&access_token=${localStorage.getItem(
          'access_token'
        )}`
      )
      const album = response.data.data
      for (let index = 0; index < album.length; index++) {
        album[index] = await convertImageToBlock(album[index])
      }
      return album
    }
    default:
      return ''
  }
}

export const convertIGToBlock = async (post: IGPost) => {
  const content: Record<string, any> = {}
  content.blocks = []

  console.log({ post })

  // split caption block in to an array
  let caption = post.caption.split('\n\n')

  // /*
  // header of reviews if there is no header on ig : ชื่อรีวิว instead
  // */
  let header = 'ชื่อรีวิว'
  if (caption[0].includes('\n')) {
    const buffer = caption[0].split('\n')
    caption.shift()
    header = buffer.shift() || 'ชื่อรีวิว'
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
  const igBlock = await convertImageToBlock(post)

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
