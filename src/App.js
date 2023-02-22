import {React, useEffect} from 'react';
// import { Counter } from './features/counter/Counter';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {auth} from './FB.js'
import {onAuthStateChanged } from "firebase/auth";
import {useDispatch, useSelector} from 'react-redux'
import {logout, login, selectUser} from './features/userSlice'
import './App.css';


import HomeScreen from './screens/HomeScreen.js'
import LoginScreen from './screens/LoginScreen.js'
import ProfileScreen from './screens/ProfileScreen.js'

function App() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                //logged in
                dispatch(login({
                    uid: user.uid,
                    email: user.email,
                }))
            } else {
                //logged out
                dispatch(logout())
            }
        });
        return unsubscribe 
    }, [])

  return (
    <div className="app">
        <Router>
            <Routes>
                
                {!user ? (
                    <Route path="/" element={<LoginScreen />}/>    
                ) : 
                (
                    <>
                    
                        <Route path="/" element={<HomeScreen />}/>
                        <Route path="/profile" element={<ProfileScreen />} />

                    </>
                )
                }
            </Routes>
        </Router>
    </div>
  );
}

export default App;
