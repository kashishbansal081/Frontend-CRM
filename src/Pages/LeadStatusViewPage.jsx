  import { useEffect, useState } from "react";
  import Sidebar from "../Components/Layout/Sidebar";

  export default function LeadsByStatus() {
    const [leads, setLeads] = useState([]);
    const [agentFilter, setAgentFilter] = useState({});
    const [priorityFilter, setPriorityFilter] = useState({});
    const [sortOrder, setSortOrder] = useState({});

    useEffect(() => {
      fetch("https://crm-backend-beryl.vercel.app/v1/leads")
        .then((res) => res.json())
        .then((data) => setLeads(data));
    }, []);

    const agents = [
      ...new Set(leads.map((l) => l.salesAgent?.name).filter(Boolean)),
    ];

    const groupedByStatus = leads.reduce((acc, lead) => {
      acc[lead.status] = acc[lead.status] || [];
      acc[lead.status].push(lead);
      return acc;
    }, {});

    return (
      <>
        <style>
  {`
    .page-wrapper {
      margin-left: 240px;
      padding: 1rem;
    }

    .page-title {
     margin-bottom: 1rem;
    }


    @media (max-width: 768px) {
      .page-wrapper {
        margin-left: 0;
      }
    }

    .status-card {
      width: 100%;
    }

    @media (min-width: 768px) {
      .status-card {
        width: 50%;
      }
    }
  `}
</style>


        <Sidebar />

<div className="page-wrapper d-flex flex-column flex-md-row flex-wrap gap-4">
          <div className="w-100">
  <h2 className="page-title">Leads by Status</h2>
</div>

          {Object.entries(groupedByStatus).map(([status, statusLeads]) => {
            let visibleLeads = [...statusLeads];

            if (agentFilter[status]) {
              visibleLeads = visibleLeads.filter(
                (l) => l.salesAgent?.name === agentFilter[status]
              );
            }

            if (priorityFilter[status]) {
              visibleLeads = visibleLeads.filter(
                (l) => l.priority === priorityFilter[status]
              );
            }

            if (sortOrder[status]) {
              visibleLeads.sort((a, b) => a.timeToClose - b.timeToClose);
            }

            return (
              <div key={status} className="card status-card mb-4">
                <div className="card-body">
                  <h5 className="mb-3">Status: {status}</h5>

                  <div className="d-flex flex-column flex-md-row gap-2 mb-3">
                    {/* Agent Filter */}
                    <select
                      className="form-select w-100 w-md-auto"
                      onChange={(e) =>
                        setAgentFilter({
                          ...agentFilter,
                          [status]: e.target.value,
                        })
                      }
                    >
                      <option value="">All Agents</option>
                      {agents.map((a) => (
                        <option key={a}>{a}</option>
                      ))}
                    </select>

                    {/* Priority Filter */}
                    <select
                      className="form-select w-100 w-md-auto"
                      onChange={(e) =>
                        setPriorityFilter({
                          ...priorityFilter,
                          [status]: e.target.value,
                        })
                      }
                    >
                      <option value="">All Priorities</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>

                    {/* Sort */}
                    <button
                      className="btn btn-outline-secondary btn-sm w-100 w-md-auto"
                      onClick={() =>
                        setSortOrder({
                          ...sortOrder,
                          [status]: true,
                        })
                      }
                    >
                      Sort by Time to Close
                    </button>
                  </div>

                  {visibleLeads.map((lead) => (
                    <div
                      key={lead._id}
                      className="border-bottom py-2 d-flex justify-content-between"
                    >
                      <span>{lead.name}</span>
                      <small className="text-muted">
                        Agent: {lead.salesAgent?.name} | Priority: {lead.priority}
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
      </>
    );
  }
