import React, { useEffect, useState } from 'react';
import UsersService from '../service/UsersService';
import Dashboard from '../dashboard/Dashboard';

function ParentComponent() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await UsersService.getYourProfile(token);
        setProfile(response);

        // Optional: store in localStorage
        localStorage.setItem('name', response.name);
        localStorage.setItem('email', response.email);
        localStorage.setItem('role', response.role);
        localStorage.setItem('city', response.city);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <Dashboard profile={profile} />
    </div>
  );
}

export default ParentComponent;
