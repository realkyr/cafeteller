import axios from 'axios'

const isArrayHasDuplicateEl = (array1, array2) => {
  if (!array1) array1 = []
  if (!array2) array2 = []
  for (const el of array1) {
    if (array2.includes(el)) return true
  }
  return false
}

const isArrayExist = (array) => (array && array.length)

const igToBlock = async (post) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  switch (post.media_type) {
    case 'IMAGE': {
      const res = await axios.post(
        '/api/instagram/upload',
        JSON.stringify({
          access_token: localStorage.getItem('access_token'),
          url: post.media_url
        }),
        config
      )
      console.log(res.data)
      return {
        type: 'image',
        data: {
          file: {
            url: res.data.file.url
          },
          caption: '',
          withBorder: true,
          stretched: false,
          withBackground: false
        }
      }
    }
    case 'VIDEO': {
      const resv = await axios.post(
        '/api/instagram/upload',
        JSON.stringify({
          access_token: localStorage.getItem('access_token'),
          url: post.media_url
        }),
        config
      )
      return {
        type: 'video',
        data: {
          file: {
            url: resv.data.file.url
          }
        }
      }
    }
    case 'CAROUSEL_ALBUM': {
      let album = await axios.get(
        `https://graph.instagram.com/${
          post.id
        }/children?fields=thumbnail_url,id,media_url,media_type,permalink&access_token=${localStorage.getItem(
          'access_token'
        )}`
      )
      album = album.data.data
      for (let index = 0; index < album.length; index++) {
        album[index] = await igToBlock(album[index])
      }
      return album
    }
    default:
      return ''
  }
}

export { isArrayHasDuplicateEl, isArrayExist, igToBlock }
