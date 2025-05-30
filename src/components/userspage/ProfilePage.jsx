import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UsersService from '../service/UsersService';

function ProfilePage({ profileInfo }) {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (profileInfo.role === 'ADMIN') {
      const token = localStorage.getItem('token');
      fetchAllUsers(token);
    }
  }, [profileInfo]);

  const fetchAllUsers = async (token) => {
    try {
      const usersResponse = await UsersService.getAllUsers(token);
      setAllUsers(usersResponse.usersDtoList);
    } catch (error) {
      console.error('Error fetching all users:', error);
    }
  };

  return (
    <div className="profile-page-container">
      <h2>Profile Information</h2>
      <p>Name: {profileInfo.name}</p>
      <p>Email: {profileInfo.email}</p>
      <p>City: {profileInfo.city}</p>
      <p>Role: {profileInfo.role}</p>

      {profileInfo.role === 'ADMIN' && (
        <>
          <h3 style={{ marginTop: '30px', color: 'green' }}>All Users</h3>
          <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '10px' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>City</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(allUsers || []).map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.city}</td>
                  <td>
                    <Link to={`/admin/update/${user.id}`} className="btn">
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
