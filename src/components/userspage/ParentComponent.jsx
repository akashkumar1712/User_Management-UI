import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersService from '../service/UsersService';
import Dashboard from '../dashboard/Dashboard';

function ParentComponent() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/home', { replace: true });
          return;
        }

        const response = await UsersService.getYourProfile(token);
        setProfile(response);

        // Optional: store in localStorage
        localStorage.setItem('name', response.name);
        localStorage.setItem('email', response.email);
        localStorage.setItem('role', response.role);
        localStorage.setItem('city', response.city);
      } catch (err) {
        console.error('Error fetching profile:', err);
        navigate('/home', { replace: true }); // redirect on error
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return null; // or a spinner if you want

  return (
    <div>
      <Dashboard profile={profile} />
    </div>
  );
}

export default ParentComponent;
