const GCPFoldersCard = ({ folders }) => {
  return (
    <div className="bg-white rounded shadow-sm">
      <div className="px-4 py-3 border-b bg-gray-50">
        <h5 className="text-sm font-semibold text-red-600 m-0">GCP FOLDERS</h5>
      </div>
      <div className="p-4">
        <table className="table table-sm table-hover mb-0" style={{ fontSize: '13px' }}>
          <thead className="bg-light">
            <tr>
              <th style={{ fontSize: '12px', fontWeight: '600' }}>Sr.No.</th>
              <th style={{ fontSize: '12px', fontWeight: '600' }}>GCP Folders</th>
              <th style={{ fontSize: '12px', fontWeight: '600' }}>Docs</th>
              <th style={{ fontSize: '12px', fontWeight: '600' }}>Total (GB)</th>
            </tr>
          </thead>
          <tbody>
            {folders.map((folder) => (
              <tr key={folder.no}>
                <td>{folder.no}</td>
                <td>{folder.name}</td>
                <td>{folder.docs}</td>
                <td>{folder.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GCPFoldersCard;