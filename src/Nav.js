import {React, useState, useEffect} from 'react'


import './Nav.css'

function Nav() {
    const [show, setShow] = useState(false)

    const transitionNavBar = () => {
        if (window.scrollY > 200) {
            setShow(true)
        } else {
            setShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener("scroll", transitionNavBar)
    }, [])

  return (
    <div className={`nav ${show && 'nav__black'}`}>
        <div className="nav__contents">
            <img className="nav__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                alt="logo" 
                />
            <img className="nav__avatar" 
                src="https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg"
                alt="avatar" 
                />
        </div>
    </div>
    
  )
}

export default Nav