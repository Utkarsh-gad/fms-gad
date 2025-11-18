import React, { useEffect, useMemo, useState } from 'react';

const SAMPLE_TASKS = [
  { id: 100, task: 'Machine Wise Monthly Production', file1: '✗', file2: '✗', file3: '✗', livePhoto: false, photoMandatory: false, frequency: 'monthly', user: 'auto report', department: 'sujata', plannedDate: '09-09-2025', actualDate: '09-09-2025', remark: '', cf: false, status: 'open', lateDays: 0, maxCfDays: 0, updatedAt: '2025-08-22' },
  { id: 47, task: 'Annual General Meeting (Agm)', file1: '✗', file2: '✗', file3: '✗', livePhoto: false, photoMandatory: false, frequency: 'every year', user: 'bharti', department: 'accounts', plannedDate: '20-09-2025', actualDate: '20-09-2025', remark: 'pending with anurag jain', cf: true, status: 'open', lateDays: 0, maxCfDays: 0, updatedAt: '2025-09-23' },
  { id: 43, task: 'Aoc-4(to File Financial Statement With Roc)', file1: '✗', file2: '✗', file3: '✗', livePhoto: false, photoMandatory: false, frequency: 'every year', user: 'bharti', department: 'accounts', plannedDate: '19-10-2025', actualDate: '19-10-2025', remark: 'pending with anurag jain', cf: true, status: 'open', lateDays: 0, maxCfDays: 0, updatedAt: '2025-10-20' },
  { id: 77, task: 'Upper Msq Reset Every Week Fg/semifinished/uppers', file1: '✗', file2: '✗', file3: '✗', livePhoto: false, photoMandatory: false, frequency: 'every 7 days', user: 'Select', department: 'back office', plannedDate: '10-11-2025', actualDate: '10-11-2025', remark: '', cf: false, status: 'open', lateDays: 0, maxCfDays: 0, updatedAt: '2025-10-11' },
  { id: 1330, task: 'All Employee Score Em Do Every Monday.', file1: '✗', file2: '✗', file3: '✗', livePhoto: false, photoMandatory: false, frequency: 'every 7 days', user: 'ea', department: 'back office', plannedDate: '10-11-2025', actualDate: '10-11-2025', remark: '', cf: false, status: 'open', lateDays: 0, maxCfDays: 0, updatedAt: '2025-10-24' },
  { id: 1308, task: 'Rexin Reject To Pass Again– Check With Store And Narinder If Happening', file1: '✗', file2: '✗', file3: '✗', livePhoto: false, photoMandatory: false, frequency: 'every 2 days', user: 'Select', department: 'upper passing', plannedDate: '12-11-2025', actualDate: '12-11-2025', remark: '', cf: false, status: 'open', lateDays: 0, maxCfDays: 0, updatedAt: '2025-10-19' },
  { id: 1309, task: 'Leather Rejection To Pass Again Before Returning', file1: '✗', file2: '✗', file3: '✗', livePhoto: false, photoMandatory: false, frequency: 'every 2 days', user: 'Select', department: 'upper passing', plannedDate: '12-11-2025', actualDate: '12-11-2025', remark: '', cf: false, status: 'open', lateDays: 0, maxCfDays: 0, updatedAt: '2025-10-19' },
  { id: 95, task: 'Scrap Sold To Kabadi Bill', file1: '✗', file2: '✗', file3: '✗', livePhoto: false, photoMandatory: false, frequency: 'every 7 days', user: 'sujata', department: 'sujata', plannedDate: '12-11-2025', actualDate: '12-11-2025', remark: '', cf: false, status: 'open', lateDays: 0, maxCfDays: 0, updatedAt: '2025-10-13' }
];

const ChecklistPage = () => {
  const [tasks, setTasks] = useState(SAMPLE_TASKS);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Open');
  const [page, setPage] = useState(1);
  const perPage = 15;

  const filtered = useMemo(() => {
    let out = tasks.slice();
    if (query) {
      const q = query.toLowerCase();
      out = out.filter(t => (t.id + ' ' + t.task + ' ' + t.user + ' ' + t.department).toLowerCase().includes(q));
    }
    if (statusFilter) {
      out = out.filter(t => t.status.toLowerCase() === statusFilter.toLowerCase());
    }
    return out;
  }, [tasks, query, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageRows = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => setPage(1), [query, statusFilter]);

  return (
    <div className="p-3 p-md-4">
      {/* Header Controls */}
      <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
        <h4 className="mb-0">Checklists</h4>
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <input type="search" className="form-control form-control-sm" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} style={{ minWidth: 200 }} />
          <select className="form-select form-select-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ minWidth: 120 }}>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="">All</option>
          </select>
          <button className="btn btn-outline-secondary btn-sm">↺ Reset</button>
          <button className="btn btn-primary btn-sm">SAVE</button>
          <button className="btn btn-outline-secondary btn-sm">⋮</button>
        </div>
      </div>

      {/* Date Range & Status */}
      <div className="row g-2 mb-3 small">
        <div className="col-auto">
          <label className="form-label mb-1">Status</label>
          <select className="form-select form-select-sm">
            <option>Open</option>
            <option>Closed</option>
          </select>
        </div>
        <div className="col-auto">
          <label className="form-label mb-1">Start Date</label>
          <input type="date" className="form-control form-control-sm" defaultValue="2025-01-01" />
        </div>
        <div className="col-auto">
          <label className="form-label mb-1">End Date</label>
          <input type="date" className="form-control form-control-sm" defaultValue="2025-11-30" />
        </div>
      </div>

      {/* Horizontally Scrollable Table */}
      <div className="card shadow-sm" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto', minHeight: 400 }}>
          <table className="table table-sm table-hover m-0" style={{ minWidth: 1800 }}>
            <thead className="table-light sticky-top small" style={{ top: 0, zIndex: 10 }}>
              <tr>
                <th style={{ width: 50, textAlign: 'center' }}><input type="checkbox" /></th>
                <th style={{ width: 70 }}>ID</th>
                <th style={{ width: 280, minWidth: 280 }}>Task</th>
                <th style={{ width: 50, textAlign: 'center' }}>File1</th>
                <th style={{ width: 50, textAlign: 'center' }}>File2</th>
                <th style={{ width: 50, textAlign: 'center' }}>File3</th>
                <th style={{ width: 80, textAlign: 'center' }}>Live Photo</th>
                <th style={{ width: 80, textAlign: 'center' }}>Photo Mandatory</th>
                <th style={{ width: 100 }}>Frequency</th>
                <th style={{ width: 110 }}>User</th>
                <th style={{ width: 120 }}>Department</th>
                <th style={{ width: 110 }}>Planned Date</th>
                <th style={{ width: 110, background: '#e8ff00' }}>Actual Date</th>
                <th style={{ width: 200 }}>Remark</th>
                <th style={{ width: 50, textAlign: 'center' }}>CF</th>
                <th style={{ width: 80 }}>Status</th>
                <th style={{ width: 80 }}>Late Days</th>
                <th style={{ width: 100 }}>Max CF Days</th>
                <th style={{ width: 140 }}>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr><td colSpan={19} className="text-center py-4">No tasks found</td></tr>
              ) : pageRows.map((t, idx) => (
                <tr key={t.id}>
                  <td style={{ textAlign: 'center' }}><input type="checkbox" /></td>
                  <td>{t.id}</td>
                  <td style={{ maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.task}</td>
                  <td style={{ textAlign: 'center' }}>{t.file1}</td>
                  <td style={{ textAlign: 'center' }}>{t.file2}</td>
                  <td style={{ textAlign: 'center' }}>{t.file3}</td>
                  <td style={{ textAlign: 'center' }}><input type="checkbox" checked={t.livePhoto} readOnly /></td>
                  <td style={{ textAlign: 'center' }}><input type="checkbox" checked={t.photoMandatory} readOnly /></td>
                  <td>{t.frequency}</td>
                  <td>{t.user}</td>
                  <td>{t.department}</td>
                  <td>{t.plannedDate}</td>
                  <td style={{ background: '#e8ff00' }}>{t.actualDate}</td>
                  <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.remark}</td>
                  <td style={{ textAlign: 'center' }}><input type="checkbox" checked={t.cf} readOnly /></td>
                  <td>{t.status}</td>
                  <td>{t.lateDays}</td>
                  <td>{t.maxCfDays}</td>
                  <td>{t.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between align-items-center p-2 small">
          <div className="text-muted">{filtered.length} tasks</div>
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-sm btn-outline-primary" disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
            <span>{page} / {totalPages}</span>
            <button className="btn btn-sm btn-outline-primary" disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChecklistPage;