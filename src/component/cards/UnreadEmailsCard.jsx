import { Star, StarOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import './cards.css';

const FAVORITES_KEY = 'favorites';
const ITEM_ID = 'all-unread-emails';

const UnreadEmailsCard = ({ emails }) => {
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
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="m-2 p-1 bg-white rounded shadow-sm">
      <div className="px-4 py-3 border-b bg-gray-50 position-relative">
        <h5 className="text-sm font-semibold text-red-600 m-0">ALL UNREAD EMAILS</h5>
        <div className="fav-star-wrapper">
          <button title={isFav ? 'Remove from favourites' : 'Add to favourites'} className="fav-btn" onClick={toggleFav} aria-pressed={isFav}>
            {isFav ? <Star style={{ color: '#f5c518', width: 18, height: 18 }} /> : <StarOff style={{ color: '#999', width: 18, height: 18 }} />}
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-3">
          <p className="text-primary mb-2" style={{ fontSize: '14px', fontWeight: '500' }}>Top 50 Unread</p>
        </div>
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {emails.map((email) => (
            <div key={email.id} className="pb-3 mb-3 border-bottom">
              <p className="mb-1 fw-semibold" style={{ fontSize: '13px' }}>{email.from}</p>
              <p className="mb-1" style={{ fontSize: '12px' }}>{email.subject}</p>
              <p className="mb-0 text-muted" style={{ fontSize: '11px' }}>{email.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnreadEmailsCard;