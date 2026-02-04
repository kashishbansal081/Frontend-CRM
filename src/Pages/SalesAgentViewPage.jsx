import { useEffect, useState } from "react";
import Sidebar from "../Components/Layout/Sidebar";

export default function LeadsByAgent() {
  const [leads, setLeads] = useState([]);
  const [statusFilter, setStatusFilter] = useState({});
  const [sortOrder, setSortOrder] = useState({});

  useEffect(() => {
    fetch("https://crm-backend-beryl.vercel.app/v1/leads")
      .then((res) => res.json())
      .then((data) => setLeads(data));
  }, []);

  const groupedByAgent = leads.reduce((acc, lead) => {
    const agentName = lead.salesAgent?.name || "Unassigned";
    acc[agentName] = acc[agentName] || [];
    acc[agentName].push(lead);
    return acc;
  }, {});

  return (
    <div className="d-flex flex-column flex-md-row">
      <Sidebar />

      <div className="flex-grow-1 main-content-padding px-3 px-md-4">
        <h2 className="mb-4">Leads by Sales Agent</h2>

        {Object.entries(groupedByAgent).map(([agentName, agentLeads]) => {
          let visibleLeads = [...agentLeads];

          if (statusFilter[agentName]) {
            visibleLeads = visibleLeads.filter(
              (l) => l.status === statusFilter[agentName]
            );
          }

          if (sortOrder[agentName]) {
            visibleLeads.sort((a, b) => a.timeToClose - b.timeToClose);
          }

          return (
            <div
              key={agentName}
              className="card mb-4 w-100 w-md-50"
            >
              <div className="card-body">
                <h5 className="mb-3">Sales Agent: {agentName}</h5>

                <div className="d-flex flex-column flex-sm-row gap-2 mb-3">
                  <select
                    className="form-select w-100 w-sm-auto"
                    onChange={(e) =>
                      setStatusFilter({
                        ...statusFilter,
                        [agentName]: e.target.value,
                      })
                    }
                  >
                    <option value="">All Status</option>
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Qualified</option>
                    <option>Closed</option>
                  </select>

                  <button
                    className="btn btn-outline-secondary btn-sm w-100 w-sm-auto"
                    onClick={() =>
                      setSortOrder({
                        ...sortOrder,
                        [agentName]: true,
                      })
                    }
                  >
                    Sort by Time to Close
                  </button>
                </div>

                {visibleLeads.map((lead) => (
                  <div
                    key={lead._id}
                    className="border-bottom py-2 d-flex flex-column flex-sm-row justify-content-between"
                  >
                    <span>{lead.name}</span>
                    <small className="text-muted">
                      Status: {lead.status}
                    </small>
                  </div>
                ))}

                {visibleLeads.length === 0 && (
                  <p className="text-muted mt-3">No leads found.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
