import React from 'react'
import './ProfileScreen.css'
import Nav from '../Nav'
import PlansScreen from './PlansScreen'

import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {selectUser} from '../features/userSlice'
import {auth} from '../FB'

function ProfileScreen() {
    const user = useSelector(selectUser)
    const navigate = useNavigate()

    const handleSignOut = () => {
        auth.signOut()
        navigate('/')
    }

  return (
    <div className="profileScreen">
        <Nav />

        <div className="profileScreen__body">
            <h1>Edit Profile</h1>
            <div className="profileScreen__info">
                <img 
                    src="https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg" 
                    alt="avatar logo"
                />
                <div className="profileScreen__details">
                    <h2>{user.email}</h2>
                    <div className="profileScreen__plans">
                        <h3>Plans</h3>

                        <PlansScreen />

                        <button 
                            onClick={handleSignOut}  
                            className="profileScreen__signOut"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileScreen