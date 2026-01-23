export default function LeadSummary({ leadData }) {
  return (
    <div className="card mb-4">
      <div className="card-header fw-semibold">
        Lead Information
      </div>

      <div className="card-body">
        <div className="row mb-2">
          <div className="col-md-6">
            <strong>Lead Name:</strong> {leadData.name}
          </div>
          <div className="col-md-6">
            <strong>Sales Agent:</strong> {leadData.salesAgent}
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-6">
            <strong>Source:</strong> {leadData.source}
          </div>
          <div className="col-md-6">
            <strong>Status:</strong> {leadData.status}
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-6">
            <strong>Time To Close:</strong> {leadData.timeToClose} days
          </div>
          <div className="col-md-6">
            <strong>Priority:</strong> {leadData.priority}
          </div>
        </div>

        <div>
          <strong>Tags:</strong>{" "}
          {leadData.tags.map((tag, idx) => (
            <span key={idx} className="badge bg-secondary me-1">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
