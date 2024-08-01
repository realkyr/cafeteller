import admin from 'firebase-admin'
import serviceAccount from '../server/serviceAccountKey.json'
import serviceAccountDev from '../server/serviceAccountKey-Dev.json'

try {
  admin.initializeApp({
    credential: admin.credential.cert(process.env.APP_ENV === 'prod' ? serviceAccount : serviceAccountDev),
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET
  })
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
  }
}
const fire = admin
export default fire
