import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyC6l6APRbWVodKId5k613eN-mZuyEcfvts",
  authDomain: "netflix-94467.firebaseapp.com",
  projectId: "netflix-94467",
  storageBucket: "netflix-94467.appspot.com",
  messagingSenderId: "530492844889",
  appId: "1:530492844889:web:360178dc35da88d4c3ba48"
};

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export {auth}; //can have many exports
export default db //can only have one default exports