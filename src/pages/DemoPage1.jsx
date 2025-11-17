import React from 'react';

const DemoPage1 = () => {
  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0 text-white">Action Taken on Complaints/Suggestions</h3>
        </div>
        <div className="card-body">
          <p className="text-muted mb-4">This page displays actions taken on complaints and suggestions.</p>
          
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Complaint ID</th>
                <th>Description</th>
                <th>Action Taken</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>C001</td>
                <td>Classroom temperature issue</td>
                <td>AC repaired</td>
                <td>2025-11-10</td>
                <td><span className="badge bg-success">Resolved</span></td>
              </tr>
              <tr>
                <td>C002</td>
                <td>WiFi connectivity problem</td>
                <td>Network upgraded</td>
                <td>2025-11-12</td>
                <td><span className="badge bg-success">Resolved</span></td>
              </tr>
              <tr>
                <td>C003</td>
                <td>Suggestion for extended library hours</td>
                <td>Under review</td>
                <td>2025-11-15</td>
                <td><span className="badge bg-warning">Pending</span></td>
              </tr>
              <tr>
                <td>C004</td>
                <td>Water cooler maintenance</td>
                <td>Scheduled for next week</td>
                <td>2025-11-16</td>
                <td><span className="badge bg-info">In Progress</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DemoPage1;
