import React from 'react';

const ParentFeedbackPage = () => {
  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-header bg-info text-white">
          <h3 className="mb-0 text-white">Parental Feedback</h3>
        </div>
        <div className="card-body">
          <p className="text-muted mb-4">This page displays feedback received from parents and guardians.</p>
          
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Feedback ID</th>
                <th>Parent Name</th>
                <th>Child Grade</th>
                <th>Feedback</th>
                <th>Date</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>FB001</td>
                <td>Mr. Sharma</td>
                <td>10-A</td>
                <td>Excellent teaching quality and discipline</td>
                <td>2025-11-14</td>
                <td><span className="badge bg-success">⭐⭐⭐⭐⭐</span></td>
              </tr>
              <tr>
                <td>FB002</td>
                <td>Mrs. Patel</td>
                <td>9-B</td>
                <td>Good infrastructure but need more sports facilities</td>
                <td>2025-11-15</td>
                <td><span className="badge bg-info">⭐⭐⭐⭐</span></td>
              </tr>
              <tr>
                <td>FB003</td>
                <td>Mr. Singh</td>
                <td>11-C</td>
                <td>Very satisfied with the overall performance of the school</td>
                <td>2025-11-16</td>
                <td><span className="badge bg-success">⭐⭐⭐⭐⭐</span></td>
              </tr>
              <tr>
                <td>FB004</td>
                <td>Ms. Khan</td>
                <td>8-A</td>
                <td>Looking for improvement in lab facilities</td>
                <td>2025-11-17</td>
                <td><span className="badge bg-warning">⭐⭐⭐</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ParentFeedbackPage;
