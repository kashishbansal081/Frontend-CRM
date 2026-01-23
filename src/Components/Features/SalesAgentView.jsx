import { useEffect, useState } from "react";

export default function SalesAgentView() {
  const [leads, setLeads] = useState([]);
  const [agents, setAgents] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [prioritySort, setPrioritySort] = useState("");

  useEffect(() => {
    fetch("https://crm-backend-beryl.vercel.app/v1/leads")
      .then((res) => res.json())
      .then((data) => setLeads(data))
      .catch((err) => console.log("Lead Error:", err));

    fetch("https://crm-backend-beryl.vercel.app/v1/agents")
      .then((res) => res.json())
      .then((agents) => setAgents(agents))
      .catch((err) => console.log("Agent Error:", err));
  }, []);

  const priorityRank = {
    High: 3,
    Medium: 2,
    Low: 1,
  };

  const attachAgentNames = leads.map((lead) => {
    const match = agents.find((a) => a._id === lead.salesAgent);
    return {
      ...lead,
      agentName: match ? match.name : "Unknown Agent",
    };
  });

  const filteredLeads = attachAgentNames.filter((lead) =>
    statusFilter ? lead.status === statusFilter : true
  );

  if (prioritySort === "High→Low") {
    filteredLeads.sort(
      (a, b) => priorityRank[b.priority] - priorityRank[a.priority]
    );
  }

  if (prioritySort === "Low→High") {
    filteredLeads.sort(
      (a, b) => priorityRank[a.priority] - priorityRank[b.priority]
    );
  }

  const leadsByAgent = filteredLeads.reduce((acc, lead) => {
    if (!acc[lead.agentName]) acc[lead.agentName] = [];
    acc[lead.agentName].push(lead);
    return acc;
  }, {});

  return (
    <div className="container my-4">
      <h3 className="mb-4">Sales Agent View</h3>

      <div className="row mb-4">
        <div className="col-md-4">
          <label>Status Filter</label>
          <select
            className="form-control"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className="col-md-4">
          <label>Sort by Priority</label>
          <select
            className="form-control"
            value={prioritySort}
            onChange={(e) => setPrioritySort(e.target.value)}
          >
            <option value="">None</option>
            <option value="High→Low">High → Low</option>
            <option value="Low→High">Low → High</option>
          </select>
        </div>
      </div>

      {Object.keys(leadsByAgent).length === 0 && (
        <p className="text-muted">No data found.</p>
      )}

      {Object.keys(leadsByAgent).map((agent) => (
        <div key={agent} className="mb-5">
          <h4 className="border-bottom pb-2 mb-3">{agent}</h4>

          {leadsByAgent[agent].map((lead) => (
            <div key={lead._id} className="card mb-2">
              <div className="card-body py-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{lead.name}</strong>
                    <div className="text-muted small">
                      Status: {lead.status} | Time to close:
                      {lead.timeToClose} days
                    </div>
                  </div>

                  <span
                    className={`badge ${
                      lead.priority === "High"
                        ? "bg-danger"
                        : lead.priority === "Medium"
                        ? "bg-warning text-dark"
                        : "bg-secondary"
                    }`}
                  >
                    {lead.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
