import React from 'react'
import './LoginScreen.css'

function LoginScreen() {
  return (
    <div className="loginScreen">
        <div className="loginScreen__background">
            <img 
                className="loginScreen__logo" 
                src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" 
                alt="" 
            />
            <button className="loginScreen__button">Sign In</button>

        </div>
        <div className="loginScreen__gradient"></div>
        <div className="loginScreen__body">
            <>
                <h1>Unlimited movies, TV shows and more.</h1>
                <h2>Watch anywhere. Cancel at any time.</h2>
                <h3>Ready to watch Netflix? Enter your email to create or restart your membership.</h3>

                <div className="loginScreen__input">
                    <form>
                        <input type="email" placeholder="Email address" />
                        <button className="loginScreen__getStarted">GET STARTED</button>
                    </form>
                </div>
            </>
        </div>
    </div>
  )
}

export default LoginScreen