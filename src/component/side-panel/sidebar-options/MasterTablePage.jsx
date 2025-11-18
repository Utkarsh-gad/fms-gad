import React, { useEffect, useMemo, useState } from "react";

const masterTableDemo = [
  { id: 1, feature: "party wise pending order", mainCategory: "cards", usersCount: 2, subCategory: "", assignedUsers: "admin, nishu" },
  { id: 2, feature: "article wise pending", mainCategory: "cards", usersCount: 1, subCategory: "", assignedUsers: "" },
  { id: 3, feature: "Email Credentials", mainCategory: "admin", usersCount: 2, subCategory: "", assignedUsers: "admin, nishu" },
  { id: 4, feature: "Email Providers", mainCategory: "admin", usersCount: 2, subCategory: "", assignedUsers: "admin, nishu" },
  { id: 5, feature: "Email Signatures", mainCategory: "admin", usersCount: 2, subCategory: "", assignedUsers: "admin, nishu" },
  { id: 6, feature: "Article Wise Company Sales", mainCategory: "staff incentives", usersCount: 3, subCategory: "", assignedUsers: "admin, nishu, deepak" },
  { id: 7, feature: "Staff Daily Sales", mainCategory: "staff incentives", usersCount: 4, subCategory: "", assignedUsers: "admin, nishu, u1234567891" },
  { id: 8, feature: "Month Wise Party Incentive", mainCategory: "staff incentives", usersCount: 2, subCategory: "", assignedUsers: "admin, nishu" },
  { id: 9, feature: "Registered Users", mainCategory: "staff incentives", usersCount: 3, subCategory: "", assignedUsers: "admin, nishu, nisha jha" }
];

const MasterTablePage = () => {
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 15;

  useEffect(() => {
    // Try to fetch table data from a published TSV or Apps Script endpoint.
    // If that fails (CORS), fall back to demo data.
    const SPREADSHEET_TSV =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSQfGp1-F9y162EixFpR9kelJpLD__Zl66NBbqR5bUzVD7tqZ5fVqucqaS0b_Pg4CuWk23PeAih8S88/pub?gid=0&single=true&output=tsv";

    let didCancel = false;

    fetch(SPREADSHEET_TSV)
      .then((r) => r.text())
      .then((tsv) => {
        if (didCancel) return;
        if (!tsv || tsv.trim().startsWith("<")) {
          // empty or HTML response - use demo data
          setRows(masterTableDemo);
          return;
        }
        const lines = tsv.trim().split("\n").map((l) => l.split("\t"));
        const headers = lines[0].map((h) => h.trim());
        const dataLines = lines.slice(1);
        const parsed = dataLines.map((cols, idx) => {
          const obj = { id: idx + 1 };
          headers.forEach((h, i) => {
            obj[h || `col${i}`] = cols[i] || "";
          });
          return obj;
        });
        setRows(parsed);
      })
      .catch((err) => {
        console.warn("Master table fetch failed, using demo data", err);
        setRows(masterTableDemo);
      });

    return () => {
      didCancel = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!query) return rows;
    const q = query.toLowerCase();
    return rows.filter((r) =>
      Object.values(r).some((v) => String(v).toLowerCase().includes(q))
    );
  }, [rows, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageRows = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => setPage(1), [query]);

  return (
    <div className="p-3 p-md-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Master Table</h3>
        <div className="d-flex align-items-center gap-2">
          <input
            type="search"
            className="form-control form-control-sm"
            placeholder="Search table..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ minWidth: 220 }}
          />
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-sm table-hover m-0">
            <thead className="table-light">
              <tr>
                <th style={{ width: 60 }}>#</th>
                <th>Feature</th>
                <th>Main Category</th>
                <th>Users Count</th>
                <th>Sub Category</th>
                <th>Assigned Users</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-3">
                    No data available
                  </td>
                </tr>
              ) : (
                pageRows.map((r, i) => (
                  <tr key={r.id || i}>
                    <td>{(page - 1) * perPage + i + 1}</td>
                    <td>{r.feature || r.Feature || r.feature_name || r["Feature"] || r["feature"] || "-"}</td>
                    <td>{r.mainCategory || r.MainCategory || r["Main Category"] || r["main_category"] || "-"}</td>
                    <td>{r.usersCount || r.UsersCount || r["Users Count"] || r["users_count"] || "-"}</td>
                    <td>{r.subCategory || r.SubCategory || r["Sub Category"] || "-"}</td>
                    <td>{r.assignedUsers || r.AssignedUsers || r["Assigned Users"] || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between align-items-center p-2">
          <div className="text-muted">{filtered.length} items</div>
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-sm btn-outline-primary"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            <span className="mx-2">{page} / {totalPages}</span>
            <button
              className="btn btn-sm btn-outline-primary"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterTablePage;