import firebase from 'firebase/app'
import 'firebase/analytics'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
}

try {
  // check if this is on client
  if (typeof window !== 'undefined') {
    firebase.initializeApp(firebaseConfig)
    firebase.analytics()
  }
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Client Firebase initialization error', err.stack)
  }
}
const fire = firebase
export default fire
