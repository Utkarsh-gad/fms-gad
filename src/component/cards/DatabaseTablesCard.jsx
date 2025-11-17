import { Star, StarOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import './cards.css';

const FAVORITES_KEY = 'favorites';
const ITEM_ID = 'database-tables';

const DatabaseTablesCard = ({ tables }) => {
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
        <h5 className="text-sm font-semibold text-red-600 m-0">DATABASE TABLES</h5>
        <div className="fav-star-wrapper">
          <button title={isFav ? 'Remove from favourites' : 'Add to favourites'} className="fav-btn" onClick={toggleFav} aria-pressed={isFav}>
            {isFav ? <Star style={{ color: '#f5c518', width: 18, height: 18 }} /> : <StarOff style={{ color: '#999', width: 18, height: 18 }} />}
          </button>
        </div>
      </div>
      <div className="p-4">
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <table className="table table-sm table-hover mb-0" style={{ fontSize: '13px' }}>
            <thead className="bg-light sticky-top">
              <tr>
                <th style={{ fontSize: '12px', fontWeight: '600' }}>Sr.No.</th>
                <th style={{ fontSize: '12px', fontWeight: '600' }}>Database Tables</th>
                <th style={{ fontSize: '12px', fontWeight: '600' }}>Docs</th>
                <th style={{ fontSize: '12px', fontWeight: '600' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table) => (
                <tr key={table.no}>
                  <td>{table.no}</td>
                  <td>{table.name}</td>
                  <td>{table.docs}</td>
                  <td>{table.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DatabaseTablesCard;