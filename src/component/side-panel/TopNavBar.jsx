import React from 'react';
import { LogOut, Menu } from 'lucide-react';
import '../styles/TopNavBar.css';

const TopNavbar = ({ onLogout }) => {
  // Prefer currently authenticated user ('authUser' or 'user'), fallback to first in 'users' array
  let user = {};
  try {
    user = JSON.parse(localStorage.getItem('authUser')) || JSON.parse(localStorage.getItem('user')) || (JSON.parse(localStorage.getItem('users') || '[]')[0]) || {};
  } catch (e) {
    user = {};
  }

  const toggleSidebar = () => {
    const sb = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sb) sb.classList.toggle('mobile-open');
    if (overlay) overlay.classList.toggle('active');
  };

  return (
    <div className="top-navbar bg-white border-bottom shadow-sm" style={{ position: 'sticky', top: 0, zIndex: 999 }}>
      <div className="px-4 py-2 d-flex justify-content-between align-items-center" style={{ width: '100%' }}>
        <div className="d-flex align-items-center">
          <button aria-label="Open menu" className="mobile-menu-toggle icon-btn me-3" onClick={toggleSidebar}>
            <Menu />
          </button>
          <h2 className="mb-0 fw-bold">Admin Dashboard</h2>
        </div>

        <div className="d-flex align-items-center gap-3">
          <span className="m-2 p-2 text-muted small">{user.userName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Admin'}</span>
          <button className="logout-btn d-flex align-items-center gap-1" onClick={onLogout}>
            <LogOut style={{ width: '16px', height: '16px' }} />
            <span className="logout-text">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
