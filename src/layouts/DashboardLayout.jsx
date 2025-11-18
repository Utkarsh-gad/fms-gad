import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../component/SideBar';
import TopNavbar from '../component/TopNavBar';
import DashboardPage from '../pages/DashBoardPage';
import FavouritesPage from '../pages/FavouritesPage';
import MasterFmsPage from '../pages/MasterFmsPage';
import MasterTablePage from '../pages/MasterTablePage';
import UsersPage from '../pages/UsersPage';
import EmailPage from '../pages/EmailPage';
import ChecklistPage from '../pages/CheckListPage';
import FeaturesPage from '../pages/FeaturesPage';
import UploadPage from '../pages/UploadPage';
import SuggestionCompainEntryPage from '../pages/SuggestionCompainEntryPage';
import ActionTakenOnComplainPage from '../pages/ActionTakenOnComplainPage';
import ParentFeedbackPage from '../pages/ParentFeedbackPage';
import ReViseComplainPage from '../pages/ReViseComplainPage';
// import './DashboardLayout.css'; // optional layout styles

const DashboardLayout = () => {
  const [activeRoute, setActiveRoute] = useState('dashboard');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="app-layout d-flex">
      <Sidebar activeRoute={activeRoute} setActiveRoute={setActiveRoute} />
      <div className="sidebar-overlay" onClick={() => {
        const sb = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        if (sb) sb.classList.remove('mobile-open');
        if (overlay) overlay.classList.remove('active');
      }} />
      <div className="main-wrapper flex-grow-1 d-flex flex-column">
        <TopNavbar onLogout={handleLogout} />
        <div className="content-wrapper flex-grow-1 overflow-auto p-4">
          <Routes>
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="favourites" element={<FavouritesPage />} />
            <Route path="master-fms" element={<MasterFmsPage />} />
            <Route path="master-fms/suggestion-entry" element={<SuggestionCompainEntryPage />} />
            <Route path="master-fms/action-taken" element={<ActionTakenOnComplainPage />} />
            <Route path="master-fms/parent-feedback" element={<ParentFeedbackPage />} />
            <Route path="master-fms/revise-complain" element={<ReViseComplainPage />} />
            <Route path="master-table" element={<MasterTablePage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="email" element={<EmailPage />} />
            <Route path="checklist" element={<ChecklistPage />} />
            <Route path="features" element={<FeaturesPage />} />
            <Route path="upload" element={<UploadPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;