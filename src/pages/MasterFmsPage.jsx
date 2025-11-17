import { Link } from "react-router-dom";


const MasterFmsPage = () => {
  const cards = [
    { id: 1, title: 'Complaints and Suggestions Entry', assigned: 'Assigned', role: 'Co-ordinator/DP/Teacher', route: 'testlink' },
    { id: 2, title: 'Action Taken on Complaints/Suggestions', assigned: 'Assigned', role: 'Co-ordinator/DP/Teacher', route: 'demo-page-1' },
    { id: 3, title: 'Parental Feedback', assigned: 'Assigned', role: 'CRM', route: 'demo-page-2' },
    { id: 4, title: 'Re-Vision Of Complaint', assigned: 'Assigned', role: 'CRM', route: 'demo-page-3' },
  ];

  return (
    <div className="p-2 p-sm-3 p-md-4">
      <div className="bg-white rounded shadow-sm p-3 p-md-4">
        <h3 className="mb-4 fw-bold text-center">Master FMS</h3>
        <div className="row g-3 g-md-4">
          {cards.map((card) => (
            <div key={card.id} className="col-12 col-sm-6 col-lg-3">
              <div className="card h-100 border-success shadow-sm">
                <div className="card-header bg-light border-success">
                  <h5 className="card-title m-0 fs-6 fw-semibold">{card.title}</h5>
                </div>
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title fw-bold text-success mb-2">{card.assigned}</h6>
                  <span className="fw-bold text-muted mb-3 flex-grow-1">{card.role}</span>
                  <Link
                    to={`/dashboard/master-fms/${card.route}`}
                    className="btn btn-primary btn-sm mt-auto align-self-center"
                  >
                    View Entry
                  </Link>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MasterFmsPage;