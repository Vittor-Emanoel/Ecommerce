import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCzntEpXdhwbmPpMQgB5HQBZ6kOpw1DHN0',
  authDomain: 'club-ecommerce-d8d7c.firebaseapp.com',
  projectId: 'club-ecommerce-d8d7c',
  storageBucket: 'club-ecommerce-d8d7c.appspot.com',
  messagingSenderId: '126005769415',
  appId: '1:126005769415:web:9aa99cf922ce67691e7ae2'
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
