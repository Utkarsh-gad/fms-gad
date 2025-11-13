import { Search } from "lucide-react";

const AgeingAbove90Card = ({ data }) => {
  return (
    <div className="bg-white rounded shadow-sm">
      <div className="px-4 py-3 border-b bg-gray-50">
        <h5 className="text-sm font-semibold text-red-600 m-0">AGEING ABOVE 90 DAYS</h5>
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