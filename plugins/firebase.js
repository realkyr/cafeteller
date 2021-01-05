import firebase from 'firebase/app'
const firebaseConfig = {
  apiKey: 'AIzaSyAgW7YOGo43cx2Q6uAJObAnWUbxztTWDHA',
  authDomain: 'cafeteller-f18b8.firebaseapp.com',
  databaseURL: 'https://cafeteller-f18b8.firebaseio.com',
  projectId: 'cafeteller-f18b8',
  storageBucket: 'cafeteller-f18b8.appspot.com',
  messagingSenderId: '1064216325735',
  appId: '1:1064216325735:web:14e05d5742abbb920c2ec2',
  measurementId: 'G-97E024VT0F'
}

try {
  firebase.initializeApp(firebaseConfig)
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
  }
}
const fire = firebase
export default fire
