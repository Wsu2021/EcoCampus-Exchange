import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', formData);
            localStorage.setItem('token', response.data.token);
            onLogin();
        } catch (error) {
            alert(error.response.data.error);
        }
    };

    return (
        <div className="login-container">
            <h2>User log in page</h2>
            <div className="login-box">
                <h3>Welcome to the login Page!</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" name="username" placeholder="User name" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <a href="/forgot-password">Forgot your password? Click here</a>
            </div>
        </div>
    );
};

export default LoginPage;
