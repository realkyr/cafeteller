import admin from 'firebase-admin'
import serviceAccount from '../server/serviceAccountKey.json'

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://cafeteller-f18b8.firebaseio.com',
    storageBucket: 'cafeteller-f18b8.appspot.com'
  })
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
  }
}
const fire = admin
export default fire
