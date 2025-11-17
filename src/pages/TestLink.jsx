import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";

function TestLink() {
  const [data, setData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);

  const itemsPerPage = 10;

  const fetchData = () => {
    fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSQfGp1-F9y162EixFpR9kelJpLD__Zl66NBbqR5bUzVD7tqZ5fVqucqaS0b_Pg4CuWk23PeAih8S88/pub?gid=0&single=true&output=tsv"
    )
      .then((res) => res.text())
      .then((tsv) => {
        // Basic sanity checks: empty response or HTML (Google may return an HTML page)
        if (!tsv || tsv.trim().length === 0) {
          console.warn('TSV fetch returned empty response');
          setData([]);
          setLastUpdated(null);
          return;
        }

        if (tsv.trim().startsWith('<')) {
          // Likely an HTML page returned instead of TSV (CORS or not-published)
          console.error('TSV response looks like HTML — spreadsheet may not be public or CORS blocked');
          setData([]);
          setLastUpdated(null);
          return;
        }

        const rows = tsv.trim().split("\n").map((r) => r.split("\t"));
        const headers = rows[0] || [];
        const dataRows = rows.slice(1);

        const json = dataRows.map((row) => {
          let obj = {};
          headers.forEach((h, i) => (obj[h] = row[i] != null ? row[i] : ""));
          return obj;
        });

        console.debug('Parsed TSV rows:', json.length, json[0] || null);
        setData(json);
        setLastUpdated(new Date().toLocaleTimeString());
      })
      .catch((err) => console.error("TSV Fetch Error:", err));
  };
  

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Normalize incoming data so we can render tables whether the API returns
  // an array of objects or an array-of-arrays (first row = headers).
  const normalizedData = React.useMemo(() => {
    if (!data || data.length === 0) return [];
    const first = data[0];
    if (Array.isArray(first)) {
      // Treat first row as headers
      const headers = first.map((h, i) => (h ? String(h) : `col${i + 1}`));
      const rows = data.slice(1);
      return rows.map((r) => {
        const obj = {};
        headers.forEach((h, i) => {
          obj[h] = r && r[i] != null ? r[i] : "";
        });
        return obj;
      });
    }

    if (typeof first === "object" && first !== null) {
      return data;
    }

    // Fallback: wrap primitive values into objects
    return data.map((v, i) => ({ value: v }));
  }, [data]);

  const filteredData = normalizedData.filter((row) =>
    JSON.stringify(row).toLowerCase().includes(search.toLowerCase())
  );

  // ↕ Sorting
  const sortData = (column) => {
    let direction = "ascending";
    if (sortConfig.key === column && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key: column, direction });
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const x = a[sortConfig.key] == null ? "" : String(a[sortConfig.key]);
    const y = b[sortConfig.key] == null ? "" : String(b[sortConfig.key]);
    return sortConfig.direction === "ascending"
      ? x.localeCompare(y)
      : y.localeCompare(x);
  });

  // 📄 Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const pageData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 📥 Export Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(sortedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet Data");
    XLSX.writeFile(wb, "sheet_data.xlsx");
  };

  // 📤 Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Google Sheet Data", 10, 10);
    let y = 20;
    sortedData.forEach((row) => {
      doc.text(JSON.stringify(row), 10, y);
      y += 10;
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
    });
    doc.save("sheet_data.pdf");
  };

  return (
    <div
      className={
        darkMode ? "bg-dark text-white min-vh-100" : "bg-light min-vh-100"
      }
    >
      <div className="container py-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Live Google Sheet Data</h2>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {lastUpdated && <p className="text-muted">Updated: {lastUpdated}</p>}

        {/* Search */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Export buttons */}
        <div className="d-flex gap-2 mb-3">
          <button className="btn btn-success" onClick={exportExcel}>
            Export Excel
          </button>
          <button className="btn btn-danger" onClick={exportPDF}>
            Export PDF
          </button>
        </div>

        {/* Table */}
        <div className="card shadow-sm">
          <div className="table-responsive">
            <table className="table table-bordered table-hover m-0">
              <thead className={darkMode ? "table-secondary" : "table-dark"}>
                <tr>
                  {normalizedData.length > 0 &&
                    Object.keys(normalizedData[0]).map((key) => (
                      <th
                        key={key}
                        style={{ cursor: "pointer" }}
                        onClick={() => sortData(key)}
                      >
                        {key}
                        {sortConfig.key === key &&
                          (sortConfig.direction === "ascending" ? " ▲" : " ▼")}
                      </th>
                    ))}
                </tr>
              </thead>

              <tbody>
                {pageData.length === 0 ? (
                  <tr>
                    <td colSpan="100%" className="text-center py-3">
                      {data.length === 0 ? "Loading..." : "No results found."}
                    </td>
                  </tr>
                ) : (
                  pageData.map((row, index) => (
                    <tr key={index}>
                      {Object.keys(row).map((key) => (
                        <td key={key}>{row[key]}</td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick JSON preview for debugging / understanding data shape */}
        {/* <div className="mt-3">
          <h6>Data preview (first 3 rows)</h6>
          <pre style={{ maxHeight: 200, overflow: 'auto' }}>{JSON.stringify(data.slice(0, 3), null, 2)}</pre>
        </div> */}
        {/* Pagination */}
        <div className="d-flex justify-content-center mt-3 gap-2">
          <button
            className="btn btn-outline-primary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          <span className="fs-5">
            {currentPage} / {totalPages}
          </span>

          <button
            className="btn btn-outline-primary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestLink;
