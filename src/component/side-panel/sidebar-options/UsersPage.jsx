import React, { useEffect, useMemo, useState } from 'react';

const SAMPLE_USERS = [
  { id: 1, active: true, avatar: '', username: 'abhinav', password: '12345678', role: 'user', mobile: '3453435654', email: 'abhinav@gmail.com', multiLogin: true, assigned: 'sales abhishek', states: '#na' },
  { id: 2, active: true, avatar: '', username: 'ashu', password: '1234', role: 'user', mobile: '4785844545', email: 'ashu@gmail.com', multiLogin: true, assigned: 'sales avinish', states: '#na' },
  { id: 3, active: false, avatar: '', username: 'bharti', password: '1234', role: 'user', mobile: '2345678768', email: 'sanjeevmishra@gmail.com', multiLogin: false, assigned: '', states: '#na' },
  { id: 4, active: true, avatar: '', username: 'crmeast kavita', password: '259025', role: 'user', mobile: '6776565654', email: 'kavita@gmail.com', multiLogin: true, assigned: 'sales anita', states: '#na' }
];

const UsersPage = () => {
  const [users, setUsers] = useState(() => {
    try {
      const raw = localStorage.getItem('users');
      return raw ? JSON.parse(raw) : SAMPLE_USERS;
    } catch (e) {
      return SAMPLE_USERS;
    }
  });

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [selectedIds, setSelectedIds] = useState([]);
  const [filterRegistered, setFilterRegistered] = useState(false);
  const [filterBlocked, setFilterBlocked] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', password: '', email: '', mobile: '' });

  useEffect(() => {
    // persist users locally so they survive reloads
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch (e) {
      console.warn('Could not save users to localStorage', e);
    }
  }, [users]);

  const filtered = useMemo(() => {
    let out = users.slice();
    if (query) {
      const q = query.toLowerCase();
      out = out.filter(u => (u.username + ' ' + u.email + ' ' + (u.mobile||'')).toLowerCase().includes(q));
    }
    if (filterRegistered) {
      out = out.filter(u => u.registered !== false); // treat missing as registered
    }
    if (filterBlocked) {
      out = out.filter(u => u.blocked === true);
    }
    return out;
  }, [users, query, filterRegistered, filterBlocked]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageRows = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => setPage(1), [query, filterRegistered, filterBlocked]);

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleActive = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, active: !u.active } : u));
  };

  const saveUsers = () => {
    try { localStorage.setItem('users', JSON.stringify(users)); alert('Users saved locally'); }
    catch (e) { alert('Save failed'); }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const id = Date.now();
    const u = { id, active: true, avatar: '', username: newUser.username || ('user'+id), password: newUser.password || '', role: 'user', mobile: newUser.mobile || '', email: newUser.email || '', multiLogin: false, assigned: '', states: '' };
    setUsers(prev => [u, ...prev]);
    setNewUser({ username: '', password: '', email: '', mobile: '' });
    setShowAdd(false);
  };

  return (
    <div className="p-3 p-md-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4 className="mb-0">All Users</h4>
        <div className="d-flex align-items-center gap-2">
          <input type="search" className="form-control form-control-sm" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} style={{ minWidth: 220 }} />
          <button className="btn btn-outline-secondary btn-sm" title="Save" onClick={saveUsers}>Save</button>
          <button className="btn btn-primary btn-sm" onClick={() => setShowAdd(true)}>Add New</button>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3 mb-2">
        <div className="form-check">
          <input id="filterRegistered" className="form-check-input" type="checkbox" checked={filterRegistered} onChange={(e) => setFilterRegistered(e.target.checked)} />
          <label className="form-check-label" htmlFor="filterRegistered">Registered</label>
        </div>
        <div className="form-check">
          <input id="filterBlocked" className="form-check-input" type="checkbox" checked={filterBlocked} onChange={(e) => setFilterBlocked(e.target.checked)} />
          <label className="form-check-label" htmlFor="filterBlocked">Blocked</label>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-sm table-hover m-0">
            <thead className="table-light small">
              <tr>
                <th style={{ width: 36 }}><input type="checkbox" onChange={(e) => { const checked = e.target.checked; setSelectedIds(checked ? filtered.map(r=>r.id) : []); }} checked={selectedIds.length > 0 && selectedIds.length === filtered.length} /></th>
                <th style={{ width: 70 }}>Active</th>
                <th style={{ width: 70 }}>Avatar</th>
                <th>Username</th>
                <th>Password</th>
                <th>Role</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Multi Login</th>
                <th>Assigned Users</th>
                <th>States</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr><td colSpan={11} className="text-center py-4">No users found</td></tr>
              ) : pageRows.map((u, idx) => (
                <tr key={u.id}>
                  <td><input type="checkbox" checked={selectedIds.includes(u.id)} onChange={() => toggleSelect(u.id)} /></td>
                  <td><input type="checkbox" checked={!!u.active} onChange={() => toggleActive(u.id)} /></td>
                  <td>{u.avatar ? <img src={u.avatar} alt="avatar" style={{ width: 36, height: 36, borderRadius: 6 }} /> : <div style={{ width:36, height:36, borderRadius:6, background:'#f1f1f1' }} />}</td>
                  <td>{u.username}</td>
                  <td>{u.password}</td>
                  <td>{u.role}</td>
                  <td>{u.mobile}</td>
                  <td>{u.email}</td>
                  <td><input type="checkbox" checked={!!u.multiLogin} readOnly /></td>
                  <td>{u.assigned}</td>
                  <td style={{ maxWidth: 220, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.states}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between align-items-center p-2 small">
          <div className="text-muted">{filtered.length} users</div>
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-sm btn-outline-primary" disabled={page<=1} onClick={()=>setPage(p=>Math.max(1,p-1))}>Prev</button>
            <span>{page} / {totalPages}</span>
            <button className="btn btn-sm btn-outline-primary" disabled={page>=totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))}>Next</button>
          </div>
        </div>
      </div>

      {/* Add new user modal (simple inline panel) */}
      {showAdd && (
        <div className="position-fixed top-50 start-50 translate-middle" style={{ zIndex: 1100, width: 520 }}>
          <div className="card shadow">
            <div className="card-body">
              <h5 className="mb-3">Add New User</h5>
              <form onSubmit={handleAdd}>
                <div className="row g-2">
                  <div className="col-6"><input className="form-control" placeholder="Username" value={newUser.username} onChange={e=>setNewUser(s=>({...s, username:e.target.value}))} required /></div>
                  <div className="col-6"><input className="form-control" placeholder="Password" value={newUser.password} onChange={e=>setNewUser(s=>({...s, password:e.target.value}))} required /></div>
                </div>
                <div className="row g-2 mt-2">
                  <div className="col-6"><input className="form-control" placeholder="Email" value={newUser.email} onChange={e=>setNewUser(s=>({...s, email:e.target.value}))} /></div>
                  <div className="col-6"><input className="form-control" placeholder="Mobile" value={newUser.mobile} onChange={e=>setNewUser(s=>({...s, mobile:e.target.value}))} /></div>
                </div>
                <div className="d-flex justify-content-end gap-2 mt-3">
                  <button type="button" className="btn btn-outline-secondary" onClick={()=>setShowAdd(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;