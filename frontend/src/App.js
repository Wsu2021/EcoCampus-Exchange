import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import UserDetailPage from './components/UserDetailPage';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/profile" element={isLoggedIn ? <UserDetailPage /> : <LoginPage onLogin={handleLogin} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
