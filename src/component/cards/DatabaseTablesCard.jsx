const DatabaseTablesCard = ({ tables }) => {
  return (
    <div className="bg-white rounded shadow-sm">
      <div className="px-4 py-3 border-b bg-gray-50">
        <h5 className="text-sm font-semibold text-red-600 m-0">DATABASE TABLES</h5>
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