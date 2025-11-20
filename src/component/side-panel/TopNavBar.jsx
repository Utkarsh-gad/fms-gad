import React from 'react';
import { LogOut, Menu, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/TopNavBar.css';

const TopNavbar = ({ onLogout }) => {
  const navigate = useNavigate();

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

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="top-navbar bg-white border-bottom shadow-sm" style={{ position: 'sticky', top: 0, zIndex: 999 }}>
      <div className="px-4 py-2 d-flex justify-content-between align-items-center" style={{ width: '100%' }}>
        <div className="d-flex align-items-center">
          <button aria-label="Open menu" className="mobile-menu-toggle icon-btn me-3" onClick={toggleSidebar}>
            <Menu />
          </button>
          <button aria-label="Go back" className="icon-btn me-2" onClick={handleBack} title="Go back to previous page" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '8px 12px', borderRadius: '6px', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s' }}>
            <ChevronLeft style={{ width: '20px', height: '20px', color: '#333' }} />
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
