import { Search, Users, Star, StarOff } from "lucide-react";
import { useEffect, useState } from 'react';
import './cards.css';

const FAVORITES_KEY = 'favorites';

const ITEM_ID = 'top-active-users';

const TopActiveUsersCard = ({ users }) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
      setIsFav(Array.isArray(favs) && favs.includes(ITEM_ID));
    } catch (e) {
      setIsFav(false);
    }
  }, []);

  const toggleFav = () => {
    try {
      const favs = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
      const set = new Set(Array.isArray(favs) ? favs : []);
      if (set.has(ITEM_ID)) {
        set.delete(ITEM_ID);
        setIsFav(false);
      } else {
        set.add(ITEM_ID);
        setIsFav(true);
      }
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(set)));
      // dispatch a storage event for same-window listeners
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      console.error('Failed to toggle favorite', e);
    }
  };

  return (
    <div className="m-2 p-1 bg-white rounded shadow-sm">
      <div className="px-4 py-3 border-b bg-gray-50 position-relative">
        <h5 className="text-sm font-semibold text-red-600 m-0">TOP ACTIVE USERS</h5>
        <div className="fav-star-wrapper">
          <button
            aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
            onClick={toggleFav}
            className="fav-btn"
            style={{ background: 'transparent', border: 'none' }}
          >
            {isFav ? (
              <Star style={{ color: '#f5c518', width: 18, height: 18 }} />
            ) : (
              <StarOff style={{ color: '#999', width: 18, height: 18 }} />
            )}
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-3">
          <div className="position-relative">
            <Search className="position-absolute" style={{ left: '10px', top: '50%', transform: 'translateY(-50%)', width: '16px', color: '#999' }} />
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search in users"
              style={{ paddingLeft: '35px', fontSize: '13px' }}
            />
          </div>
        </div>
        <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
          {users.map((user) => (
            <div key={user.id} className="pb-3 mb-3 border-bottom">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="mb-1 fw-semibold" style={{ fontSize: '14px' }}>{user.name}</p>
                  <p className="mb-0 text-muted" style={{ fontSize: '11px' }}>Last Active: {user.lastActive}</p>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-light p-1">
                    <Users style={{ width: '14px', height: '14px' }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopActiveUsersCard;