import React, { useState } from 'react';
import axios from 'axios';
import './SignUpPage.css';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        fullName: '',
        email: '',
        address: '',
        phoneNumber: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', formData);
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.error);
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign up page</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Please enter your detail</label>
                    <div className="profile-picture">
                        <img src="path_to_your_image" alt="Profile Picture" />
                        <p>Choose your picture</p>
                    </div>
                </div>
                <div className="form-group">
                    <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
                    <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
                </div>
                <button type="submit" className="signup-button">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpPage;
