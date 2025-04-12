import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserDetailPage.css';

const UserDetailPage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: { Authorization: token },
                });
                setUser(response.data);
            } catch (error) {
                alert(error.response.data.error);
            }
        };

        fetchProfile();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-detail-container">
            <h2>User Detail page</h2>
            <div className="user-detail-box">
                <div className="user-info">
                    <h3>Your detail</h3>
                    <p><strong>Full Name:</strong> {user.fullName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                    <p><strong>Address:</strong> {user.address}</p>
                </div>
                <div className="user-listing">
                    <h3>Your listing</h3>
                    <div className="listing-item">
                        <img src="path_to_your_image" alt="Picture" />
                        <p><strong>Description:</strong> {user.description}</p>
                        <p><strong>Price:</strong> {user.price}</p>
                    </div>
                </div>
                <button className="edit-profile-button">Edit your profile</button>
            </div>
        </div>
    );
};

export default UserDetailPage;
