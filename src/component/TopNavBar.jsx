import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TopNavBar.css';

const TopNavbar = ({ setIsAuthenticated, setActiveRoute }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setActiveRoute('dashboard');
    navigate('/login');
  };

  return (
    <div 
      className="top-navbar bg-white border-bottom shadow-sm"
      style={{ position: 'sticky', top: 0, zIndex: 999 }}
    >
      <div className="px-4 py-3 d-flex justify-content-between align-items-center">
        <div className="navbar-left">
          <h2 className="mb-0 fw-bold">Admin Dashboard</h2>
        </div>
        <div className="navbar-right d-flex align-items-center gap-3">
          <span className="user-info">{user.firstName} {user.lastName}</span>
          <button className="icon-btn btn btn-light btn-sm p-2 rounded-circle">
            <Bell style={{ width: '18px', height: '18px' }} />
          </button>
          <button className="icon-btn btn btn-light btn-sm p-2 rounded-circle">
            <Settings style={{ width: '18px', height: '18px' }} />
          </button>
          <button className="logout-btn btn btn-danger btn-sm d-flex align-items-center gap-2" onClick={handleLogout}>
            <LogOut style={{ width: '16px', height: '16px' }} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
