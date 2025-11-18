import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const FAVORITES_KEY = 'favorites';

const ITEM_MAP = {
  'top-active-users': { label: 'Top Active Users', to: '/dashboard' },
  'database-tables': { label: 'Database Tables', to: '/dashboard' },
  'gcp-folders': { label: 'GCP Folders', to: '/dashboard' },
  'all-unread-emails': { label: 'All Unread Emails', to: '/dashboard' },
  'sales-dashboard': { label: 'Sales Dashboard', to: '/dashboard' },
  'ageing-above-90': { label: 'Ageing Above 90 Days', to: '/dashboard' },
};

const FavouritesPage = () => {
  const [favs, setFavs] = useState([]);

  const loadFavs = () => {
    try {
      const list = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
      setFavs(Array.isArray(list) ? list : []);
    } catch (e) {
      setFavs([]);
    }
  };

  useEffect(() => {
    loadFavs();
    const onStorage = () => loadFavs();
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const removeFav = (id) => {
    try {
      const list = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
      const newList = (Array.isArray(list) ? list : []).filter((x) => x !== id);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newList));
      setFavs(newList);
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-4">
      <div className="bg-white rounded shadow-sm p-4">
        <h3 className="mb-3">Favourites</h3>
        {favs.length === 0 ? (
          <div className="text-muted">No favourites yet. Click the star on any card to add it here.</div>
        ) : (
          <ul className="list-group">
            {favs.map((id) => {
              const meta = ITEM_MAP[id] || { label: id, to: '/dashboard' };
              return (
                <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
                  <NavLink to={meta.to} className="text-decoration-none">{meta.label}</NavLink>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => removeFav(id)}>Remove</button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FavouritesPage;