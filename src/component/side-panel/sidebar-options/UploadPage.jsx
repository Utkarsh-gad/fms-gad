
import React, { useState } from "react";
import * as XLSX from "xlsx";

const UploadPage = () => {
  const [excelData, setExcelData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setError("");
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        if (json.length === 0) throw new Error("Sheet is empty");
        setColumns(json[0]);
        setExcelData(json.slice(1));
      } catch (err) {
        setError("Failed to parse Excel file: " + err.message);
        setExcelData([]);
        setColumns([]);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-4">
      <div className="bg-white rounded shadow-sm p-4 mb-4">
        <h3 className="mb-3">Upload GRP Excel File</h3>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="form-control mb-3"
        />
        {fileName && <div className="mb-2 text-muted">Selected: {fileName}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
      {excelData.length > 0 && (
        <div className="bg-white rounded shadow-sm p-4">
          <h5 className="mb-3">Preview</h5>
          <div style={{ overflowX: "auto" }}>
            <table className="table table-bordered">
              <thead>
                <tr>
                  {columns.map((col, idx) => (
                    <th key={idx}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {excelData.map((row, ridx) => (
                  <tr key={ridx}>
                    {columns.map((_, cidx) => (
                      <td key={cidx}>{row[cidx]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;