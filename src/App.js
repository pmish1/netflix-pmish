import React from 'react';
import { Counter } from './features/counter/Counter';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


import HomeScreen from './screens/HomeScreen.js'
import LoginScreen from './screens/LoginScreen.js'
function App() {
    const user = null;
    // const user = true


  return (
    <div className="app">
        <Router>
            <Routes>
                
                {!user ? (
                    <Route path="/" element={<LoginScreen />}/>    
                ) : 
                (
                    <Route path="/" element={<HomeScreen />}/>
                )
                }
            </Routes>
        </Router>
    </div>
  );
}

export default App;
