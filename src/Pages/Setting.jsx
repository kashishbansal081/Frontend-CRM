import { useEffect, useState } from "react";
import Sidebar from "../Components/Layout/Sidebar";

export default function SettingPage() {
  const [leads, setLeads] = useState([]);
  const [agents, setAgents] = useState([]);

  const fetchLeads = async () => {
    const res = await fetch("https://crm-backend-beryl.vercel.app/v1/leads");
    const data = await res.json();
    setLeads(data);
  };

  const fetchAgents = async () => {
    const res = await fetch("https://crm-backend-beryl.vercel.app/v1/agents");
    const data = await res.json();
    setAgents(data);
  };

  useEffect(() => {
    fetchLeads();
    fetchAgents();
  }, []);

  const deleteLead = async (id) => {
    if (!window.confirm("Delete this lead?")) return;

    await fetch(`https://crm-backend-beryl.vercel.app/v1/leads/${id}`, {
      method: "DELETE",
    });

    setLeads(leads.filter((l) => l._id !== id));
  };

  const deleteAgent = async (id) => {
    if (!window.confirm("Delete this sales agent?")) return;

    await fetch(`https://crm-backend-beryl.vercel.app/v1/agents/${id}`, {
      method: "DELETE",
    });

    setAgents(agents.filter((a) => a._id !== id));
  };    

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 main-content-padding">
        <h2 className="mb-4">Settings</h2>

        <div className="card mb-4" style={{width : '50%'}}>
          <div className="card-header fw-semibold">
            Leads Management
          </div>
          <div className="card-body">
            {leads.map((lead) => (
              <div
                key={lead._id}
                className="d-flex justify-content-between align-items-center border-bottom py-2"
              >
                <span>{lead.name}</span>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteLead(lead._id)}
                >
                  Delete
                </button>
              </div>
            ))}

            {leads.length === 0 && (
              <p className="text-muted mt-2">No leads found.</p>
            )}
          </div>
        </div>

        <div className="card" style={{width : '50%'}}>
          <div className="card-header fw-semibold">
            Sales Agents Management
          </div>
          <div className="card-body">
            {agents.map((agent) => (
              <div
                key={agent._id}
                className="d-flex justify-content-between align-items-center border-bottom py-2"
              >
                <span>
                  {agent.name}{" "}
                  <small className="text-muted">
                    ({agent.email})
                  </small>
                </span>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteAgent(agent._id)}
                >
                  Delete
                </button>
              </div>
            ))}

            {agents.length === 0 && (
              <p className="text-muted mt-2">No agents found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
