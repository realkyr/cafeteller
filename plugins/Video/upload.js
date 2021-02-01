import firebase from 'plugins/firebaseclient'
import 'firebase/storage'
import moment from 'moment'

const upload = async (file, type) => {
  // upload by file function
  const storageRef = firebase.storage().ref()
  const tag = file.name.split('.').pop()
  let originalFileName = file.name.split('.').shift()
  originalFileName += `_${moment().valueOf()}`
  const imageRef = storageRef.child(
    `reviews/${type}/${moment().format('YYYYMMDD')}/${originalFileName}.${tag}`
  )
  const snapshot = await imageRef.put(file)
  if (snapshot.state === 'success') {
    const url = await imageRef.getDownloadURL()
    return {
      success: 1,
      file: {
        url,
        name: `${originalFileName}.${tag}`,
        date: moment().format('YYYYMMDD')
      }
    }
  } else {
    return {
      success: 0
    }
  }
}

export default upload
