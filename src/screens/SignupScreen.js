import {React, useRef} from 'react'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../FB.js'
import './SignupScreen.css'

function SignInScreen() {

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const register = (e) => {
        e.preventDefault()  //when button inside form, will refresh the page, we dont want that to happen

        createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then((userCredential) => {
            console.log(userCredential)
        })
        .catch ((error) => {
            console.log(error.message)
        })
    }
  
    const signIn = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then((userCredential) => {
            console.log(userCredential.user)
        })
        .catch((error) => {
            console.log(error.message)
        })
    }

  return (
    <div className="signupScreen">
        <form>
            <h1>Sign In</h1>
            <input ref={emailRef} type="email" placeholder="Email" />
            <input ref={passwordRef} placeholder="Password" type="password" />
            <button type="submit" onClick={signIn}>Sign In</button>

            <h4>
                <span className="signupScreen__gray">New to Netflix?</span>
                <span className="signupScreen__link" onClick={register}>Sign Up now.</span>
            </h4>
 
        </form>
    </div>
  )
}

export default SignInScreen