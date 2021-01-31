const axios = require('axios')

const instagram = {

  async getProfile (accessToken) {
    const response = await axios.get(
      'https://graph.instagram.com/me?fields=id,username&access_token=' + accessToken
    )
    // console.log(response)
    return response.data
  }

}

export { instagram }
