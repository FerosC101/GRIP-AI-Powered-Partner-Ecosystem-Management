import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import './App.css';

import app from './firebase'; // Firebase initialized here

function App() {
    const [currentPage, setCurrentPage] = useState('landing');

    const navigateTo = (page) => {
        setCurrentPage(page);
    };

    console.log("Firebase initialized:", app);

    return (
        <div className="App">
            {currentPage === 'landing' && <LandingPage onNavigate={navigateTo} />}
            {currentPage === 'register' && <RegisterPage onNavigate={navigateTo} />}
            {currentPage === 'login' && <LoginPage onNavigate={navigateTo} />}
        </div>
    );
}

export default App;
