import React from 'react';

const ReViseComplainPage = () => {
  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-header bg-warning text-white">
          <h3 className="mb-0 text-white">Re-Vision Of Complaint</h3>
        </div>
        <div className="card-body">
          <p className="text-muted mb-4">This page displays the re-examination and revision status of complaints.</p>
          
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Revision ID</th>
                <th>Original Complaint</th>
                <th>Submitted By</th>
                <th>Re-Examination Status</th>
                <th>Updated Date</th>
                <th>Resolution</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>REV001</td>
                <td>Classroom noise during classes</td>
                <td>Teacher A</td>
                <td><span className="badge bg-success">Approved</span></td>
                <td>2025-11-11</td>
                <td>Implemented soundproofing in Room 101</td>
              </tr>
              <tr>
                <td>REV002</td>
                <td>Inadequate parking space</td>
                <td>Staff Member</td>
                <td><span className="badge bg-info">Under Review</span></td>
                <td>2025-11-13</td>
                <td>Awaiting decision from administration</td>
              </tr>
              <tr>
                <td>REV003</td>
                <td>Laboratory equipment shortage</td>
                <td>Lab Coordinator</td>
                <td><span className="badge bg-success">Approved</span></td>
                <td>2025-11-14</td>
                <td>New equipment purchased and installed</td>
              </tr>
              <tr>
                <td>REV004</td>
                <td>Canteen food quality</td>
                <td>Student Representative</td>
                <td><span className="badge bg-warning">Pending</span></td>
                <td>2025-11-16</td>
                <td>Awaiting vendor response</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReViseComplainPage;
