const SalesDashboardCard = ({ sales }) => {
  return (
    <div className="bg-white rounded shadow-sm">
      <div className="px-4 py-3 border-b bg-gray-50">
        <h5 className="text-sm font-semibold text-red-600 m-0">SALES DASHBOARD</h5>
      </div>
      <div className="p-4">
        <div style={{ overflowX: 'auto' }}>
          <table className="table table-sm table-bordered mb-0" style={{ fontSize: '12px' }}>
            <thead className="bg-light">
              <tr>
                <th style={{ fontSize: '11px', fontWeight: '600' }}>Sales Dashboard</th>
                <th style={{ fontSize: '11px', fontWeight: '600' }}>Yesterday</th>
                <th style={{ fontSize: '11px', fontWeight: '600' }}>MTD</th>
                <th style={{ fontSize: '11px', fontWeight: '600' }}>CFY</th>
                <th style={{ fontSize: '11px', fontWeight: '600' }}>PFY</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.metric}</td>
                  <td>{item.yesterday}</td>
                  <td>{item.mtd}</td>
                  <td>{item.cfy}</td>
                  <td>{item.pfy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboardCard;