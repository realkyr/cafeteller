import admin from 'plugins/firebase'
const { instagram } = require('./module/instagram')

export default async (req, res) => {
  try {
    const profile = await instagram.getProfile(req.query.access_token)
    const additionalClaims = {
      isAdmin: true
    }
    const customToken = await admin
      .auth()
      .createCustomToken(`${profile.id}`, additionalClaims)
    res.send({ customToken, profile })
  } catch (error) {
    res.status(400)
    res.send(error)
  }
}
