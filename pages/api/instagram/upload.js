import admin from 'plugins/firebase'
import moment from 'moment'

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      // check parameter
      console.log(req.body)
      const url = req.body.url
      console.log(req.body.access_token)

      // save file from url

      const https = require('https')

      const d = new Date()
      const filename = d.getTime()
      let filetype = ''

      const bucket = admin.storage().bucket()
      const path = 'instagram/' + moment().format('YYYYMMDD') + '/' + filename
      const bucketFile = bucket.file(path)
      https.get(url, function (response) {
        filetype += '.'
        filetype += response.headers['content-type'].split('/')[1]
        response.pipe(bucketFile.createWriteStream({
          metadata: {
            contentType: response.headers['content-type']
          }
        })).on('finish', async () => {
          // trigger when finished upload
          // make file public
          await bucketFile.makePublic()
          const isPublic = await bucketFile.isPublic()
          console.log(isPublic[0])
          const publicURL = 'https://storage.googleapis.com/cafeteller-f18b8.appspot.com/' + path
          const data = {
            success: 1,
            file: {
              url: publicURL,
              filename: filename + filetype
            }
          }
          res.send(data)
        })
      })
    } catch (error) {
      console.log('=========== error ==========')
      console.log(error)
      if (error.message) {
        res.status(400).send({ error_message: error.message })
        return
      }
      res.status(error.response.status).send({ error_message: error.response.data.error.error_message })
    }
  }
}
