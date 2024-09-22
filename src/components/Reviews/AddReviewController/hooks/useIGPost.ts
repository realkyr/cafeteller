import axios from 'axios'

const useIGPost = () => {
  const igToBlock = async (post: {
    media_type: any
    media_url: any
    id: any
  }) => {
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
      // TOOD: Write module video when ready
      // case 'VIDEO': {
      //   const resv = await axios.post(
      //     '/api/instagram/upload',
      //     JSON.stringify({
      //       access_token: localStorage.getItem('access_token'),
      //       url: post.media_url
      //     }),
      //     config
      //   )
      //   return {
      //     type: 'video',
      //     data: {
      //       file: {
      //         url: resv.data.file.url
      //       }
      //     }
      //   }
      // }
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
          album[index] = await igToBlock(album[index])
        }
        return album
      }
      default:
        return ''
    }
  }
}

export default useIGPost
