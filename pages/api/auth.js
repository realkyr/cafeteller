import admin from 'plugins/firebase'
import axios from 'axios'
const qs = require('querystring')
// const { instagram } = require('./module/instagram')

export default async (req, res) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  console.log(req.query.code)

  try {
    const response = await axios.post(
      'https://api.instagram.com/oauth/access_token',
      qs.stringify({
        app_id: '569501966932938',
        app_secret: '***REMOVED***',
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.NEXT_PUBLIC_REDIRECT_IG_URL}/auth`
      }),
      config
    )
    let credential = response.data
    // res.send('request success')
    // console.dir(response)

    // create admin token
    const additionalClaims = {
      isAdmin: true
    }
    const customToken = await admin
      .auth()
      .createCustomToken(`${credential.user_id}`, additionalClaims)

    // exchange to the long access token
    const accessResponse = await axios.get(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=***REMOVED***&access_token=${credential.access_token}`)
    credential = accessResponse.data
    res.send({
      credential,
      customToken
    })
  } catch (error) {
    console.error(error)
    // console.dir(error)
    res.status(400)
    res.status(error.response.data.code).send(error.response.data)
  }
}
