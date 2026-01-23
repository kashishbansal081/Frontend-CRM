import { useState } from "react";

export default function UpdateLeadForm({ leadData }) {
  const [status, setStatus] = useState(leadData.status);
  const [agent, setAgent] = useState(leadData.salesAgent);
  const [priority, setPriority] = useState(leadData.priority);

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedLead = {
      status,
      salesAgent: agent,
      priority,
    };

    console.log("Updating lead:", updatedLead);
  };

  return (
    <div className="card mb-4">
      <div className="card-header fw-semibold">
        Update Lead
      </div>

      <div className="card-body">
        <form onSubmit={handleUpdate}>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
                <option>Closed</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Sales Agent</label>
              <input
                className="form-control"
                value={agent}
                onChange={(e) => setAgent(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Priority</label>
              <select
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <button className="btn btn-primary">
            Update Lead
          </button>
        </form>
      </div>
    </div>
  );
}
