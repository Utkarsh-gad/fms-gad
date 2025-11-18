import { Search, Star, StarOff } from "lucide-react";
import { useEffect, useState } from 'react';
import '../styles/cards.css';

const FAVORITES_KEY = 'favorites';
const ITEM_ID = 'ageing-above-90';

const AgeingAbove90Card = ({ data }) => {
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
        <h5 className="text-sm font-semibold text-red-600 m-0">AGEING ABOVE 90 DAYS</h5>
        <div className="fav-star-wrapper">
          <button title={isFav ? 'Remove from favourites' : 'Add to favourites'} className="fav-btn" onClick={toggleFav} aria-pressed={isFav}>
            {isFav ? <Star style={{ color: '#f5c518', width: 18, height: 18 }} /> : <StarOff style={{ color: '#999', width: 18, height: 18 }} />}
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
              placeholder="Search in items..."
              style={{ paddingLeft: '35px', fontSize: '13px' }}
            />
          </div>
        </div>
        <div style={{ overflowX: 'auto', maxHeight: '300px', overflowY: 'auto' }}>
          <table className="table table-sm table-hover mb-0" style={{ fontSize: '12px' }}>
            <thead className="bg-light sticky-top">
              <tr>
                <th style={{ fontSize: '11px', fontWeight: '600' }}>Dealer</th>
                <th style={{ fontSize: '11px', fontWeight: '600' }}>State</th>
                <th style={{ fontSize: '11px', fontWeight: '600' }}>Amount (Cr)</th>
                <th style={{ fontSize: '11px', fontWeight: '600' }}>Days</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.dealer}</td>
                  <td>{item.state}</td>
                  <td>{item.amount}</td>
                  <td><span className="badge bg-danger">{item.days}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgeingAbove90Card;