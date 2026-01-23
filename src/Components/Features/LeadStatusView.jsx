import { useEffect, useState } from "react";

export default function LeadStatusView() {
  const [leads, setLeads] = useState([]);
  const [agents, setAgents] = useState([]);
  const [tags, setTags] = useState([]);

  const [agentFilter, setAgentFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  useEffect(() => {
    fetch("https://crm-backend-beryl.vercel.app/v1/leads")
      .then((res) => res.json())
      .then(setLeads)
      .catch((err) => console.error("Error fetching leads", err));
  }, []);

  useEffect(() => {
    fetch("https://crm-backend-beryl.vercel.app/v1/agents")
      .then((res) => res.json())
      .then(setAgents)
      .catch((err) => console.error("Error fetching agents", err));
  }, []);

  useEffect(() => {
    fetch("https://crm-backend-beryl.vercel.app/v1/tags")
      .then((res) => res.json())
      .then(setTags)
      .catch((err) => console.error("Error fetching tags", err));
  }, []);

  const agentMap = {};
  agents.forEach((a) => (agentMap[a._id] = a.name));

  const tagMap = {};
  tags.forEach((t) => (tagMap[t._id] = t.name));

  const filteredLeads = leads.filter((lead) => {
    const agentMatch = agentFilter
      ? lead.salesAgent === agentFilter
      : true;

    const tagMatch = tagFilter
      ? lead.tags?.includes(tagFilter)
      : true;

    return agentMatch && tagMatch;
  });

  const leadsByStatus = filteredLeads.reduce((acc, lead) => {
    acc[lead.status] = acc[lead.status] || [];
    acc[lead.status].push(lead);
    return acc;
  }, {});

  const uniqueAgentIds = [...new Set(leads.map((l) => l.salesAgent))];
  const uniqueTagIds = [...new Set(leads.flatMap((l) => l.tags || []))];

  return (
    <div className="container my-4">
      <h3 className="mb-4">Lead Status View</h3>

      <div className="row mb-4">
        <div className="col-md-4">
          <label className="form-label">Filter by Sales Agent</label>
          <select
            className="form-select"
            value={agentFilter}
            onChange={(e) => setAgentFilter(e.target.value)}
          >
            <option value="">All Agents</option>
            {uniqueAgentIds.map((id) => (
              <option key={id} value={id}>
                {agentMap[id] || "Unknown Agent"}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Filter by Tag</label>
          <select
            className="form-select"
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
          >
            <option value="">All Tags</option>
            {uniqueTagIds.map((id) => (
              <option key={id} value={id}>
                {tagMap[id] || "Unknown Tag"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {Object.keys(leadsByStatus).length === 0 && (
        <p className="text-muted">No leads found.</p>
      )}

      {Object.keys(leadsByStatus).map((status) => (
        <div key={status} className="mb-5">
          <h5 className="border-bottom pb-2 mb-3">{status}</h5>

          {leadsByStatus[status].map((lead) => (
            <div key={lead._id} className="card mb-2">
              <div className="card-body py-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{lead.name}</strong>

                    <div className="text-muted small">
                      Agent:{" "}
                      <b>{agentMap[lead.salesAgent] || "Unknown"}</b> | Time to
                      close: {lead.timeToClose} days
                    </div>

                    <div className="mt-1">
                      {lead.tags?.map((tagId) => (
                        <span
                          key={tagId}
                          className="badge bg-light text-dark border me-1"
                        >
                          {tagMap[tagId] || "Unknown"}
                        </span>
                      ))}
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
