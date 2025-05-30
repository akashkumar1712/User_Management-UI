import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UsersService from '../service/UsersService';

function UpdateUser() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [userData, setUserData] = useState({
    id: '',
    name: '',
    email: '',
    role: '',
    city: ''
  });

  useEffect(() => {
    if (!userId) {
      console.error('No userId found in URL!');
      return;
    }

    fetchUserDataById(userId);
  }, [userId]);

  const fetchUserDataById = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await UsersService.getUserById(userId, token);

      const user = response.data; // assuming ApiResponse wraps the data here
      const { id, name, email, role, city } = user;
      setUserData({ id, name, email, role, city });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await UsersService.updateUser(userId, userData, token);
      alert('User profile updated successfully!');
      navigate("/admin/user-management");
    } catch (error) {
      console.error('Error updating user profile:', error);
      alert('Failed to update user.');
    }
  };

  return (
    <div className="auth-container">
      <h2 style={{ textAlign: 'center', color: 'green' }}>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            readOnly // Prevent editing email
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={userData.role}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={userData.city}
            onChange={handleInputChange}
            required
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button type="submit" className="btn">Update</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUser;
