import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'

const firebaseConfig = {
   apiKey: 'AIzaSyA_JShw9TrKC7u8WAyCiNUa6SJ-KKfEemA',
   authDomain: 'airbnb-243b2.firebaseapp.com',
   projectId: 'airbnb-243b2',
   storageBucket: 'airbnb-243b2.appspot.com',
   messagingSenderId: '64064283484',
   appId: '1:64064283484:web:acfebfcdc1b8b6934bd799',
   measurementId: 'G-64CF8XWEPP',
}

const app = initializeApp(firebaseConfig, 'airbnb')
const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
   prompt: 'select_account',
})

export { auth, googleProvider }
