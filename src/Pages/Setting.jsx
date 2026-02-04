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
    <>
      <style>
        {`
          .settings-wrapper {
            display: flex;
            flex-direction: column;
          }

          .settings-content {
            width: 100%;
            margin-left: 0;
          }

          @media (min-width: 770px) {
            .settings-wrapper {
              flex-direction: row;
            }

            .settings-content {
              margin-left: 15rem;
              width: calc(100% - 15rem);
            }
          }
        `}
      </style>

      <div className="settings-wrapper">
        <Sidebar />

        <div className="settings-content px-3 px-md-4 py-4">
          <h2 className="mb-4">Settings</h2>

          <div className="card mb-4 w-100">
            <div className="card-header fw-semibold">
              Leads Management
            </div>
            <div className="card-body">
              {leads.map((lead) => (
                <div
                  key={lead._id}
                  className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center border-bottom py-2 gap-2"
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
            </div>
          </div>

          <div className="card w-100">
            <div className="card-header fw-semibold">
              Sales Agents Management
            </div>
            <div className="card-body">
              {agents.map((agent) => (
                <div
                  key={agent._id}
                  className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center border-bottom py-2 gap-2"
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
