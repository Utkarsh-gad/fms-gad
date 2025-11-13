import { Search, Users } from "lucide-react";

const TopActiveUsersCard = ({ users }) => {
  return (
    <div className="bg-white rounded shadow-sm">
      <div className="px-4 py-3 border-b bg-gray-50">
        <h5 className="text-sm font-semibold text-red-600 m-0">TOP ACTIVE USERS</h5>
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