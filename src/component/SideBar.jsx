import React from 'react';
import './Sidebar.css'; // If Sidebar.css is in src/component/ folder

const Sidebar = ({ activeRoute, setActiveRoute }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'favourites', label: 'Favourites', icon: '⭐' },
    { id: 'master-fms', label: 'Master FMS', icon: '📋' },
    { id: 'master-table', label: 'Master Table', icon: '📑' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'email', label: 'Email', icon: '📧' },
    { id: 'checklist', label: 'Checklist', icon: '✅' },
    { id: 'features', label: 'Features', icon: '⚡' },
    { id: 'upload', label: 'Upload GRP Excel File', icon: '⬆️' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>FMS-GAD</h3>
      </div>
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.id} className={activeRoute === item.id ? 'active' : ''}>
              <button
                className="sidebar-link"
                onClick={() => setActiveRoute(item.id)}
              >
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;