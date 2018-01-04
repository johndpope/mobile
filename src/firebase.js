import firebase from 'firebase/app'
require('firebase/auth')
require('firebase/database')
// require('firebase/storage')

firebase.initializeApp({
  apiKey: 'AIzaSyAPv4r3ExuryB_jqLXzVuMxOtQbfyIg_g8',
  authDomain: 'animesgo-185323.firebaseapp.com',
  databaseURL: 'https://animesgo-185323.firebaseio.com',
  projectId: 'animesgo-185323',
  storageBucket: 'animesgo-185323.appspot.com',
  messagingSenderId: '340812628548'
})

export default firebase
