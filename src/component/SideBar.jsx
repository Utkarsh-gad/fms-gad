import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', to: '/dashboard' },
  { id: 'favourites', label: 'Favourites', to: '/dashboard/favourites' },
  { id: 'master-fms', label: 'Master FMS', to: '/dashboard/master-fms' },
  { id: 'master-table', label: 'Master Table', to: '/dashboard/master-table' },
  { id: 'users', label: 'Users', to: '/dashboard/users' },
  { id: 'email', label: 'Email', to: '/dashboard/email' },
  { id: 'checklist', label: 'Checklist', to: '/dashboard/checklist' },
  { id: 'features', label: 'Features', to: '/dashboard/features' },
  { id: 'upload', label: 'Upload GRP Excel File', to: '/dashboard/upload' },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>FMS-GAD</h3>
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.to}
                end={item.id === 'dashboard'}
                className={({ isActive }) =>
                  isActive ? 'sidebar-link active' : 'sidebar-link'
                }
              >
                <span className="label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;