import { useEffect, useState } from "react";
import Sidebar from "../Components/Layout/Sidebar";

export default function LeadsByStatus() {
  const [leads, setLeads] = useState([]);

  const [status, setStatus] = useState("New");
  const [agent, setAgent] = useState("");
  const [priority, setPriority] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("https://crm-backend-beryl.vercel.app/v1/leads")
      .then((res) => res.json())
      .then((data) => setLeads(data));
  }, []);

  const agents = [
    ...new Set(leads.map((l) => l.salesAgent?.name).filter(Boolean)),
  ];

  const filteredLeads = leads
    .filter((lead) => lead.status === status)
    .filter((lead) =>
      agent ? lead.salesAgent?.name === agent : true
    )
    .filter((lead) =>
      priority ? lead.priority === priority : true
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.timeToClose - b.timeToClose
        : b.timeToClose - a.timeToClose
    );

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 p-4">
        <h2 className="mb-4">Leads by Status</h2>

        <div className="d-flex flex-wrap gap-3 mb-4">
          <select
            className="form-select w-auto"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Closed</option>
          </select>

          <select
            className="form-select w-auto"
            onChange={(e) => setAgent(e.target.value)}
          >
            <option value="">All Agents</option>
            {agents.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>

          <select
            className="form-select w-auto"
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">All Priorities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <select
            className="form-select w-auto"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Time to Close ↑</option>
            <option value="desc">Time to Close ↓</option>
          </select>
        </div>

        <div className="card" style={{width : '40%'}}>
          <div className="card-body">
            {filteredLeads.map((lead) => (
              <div
                key={lead._id}
                className="d-flex justify-content-between align-items-center border-bottom py-2"
              >
                <span>{lead.name}</span>
                <div className="text-muted small">
                  Agent: {lead.salesAgent?.name} | Priority: {lead.priority}
                </div>
              </div>
            ))}

            {filteredLeads.length === 0 && (
              <p className="text-muted mt-3">No leads found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
