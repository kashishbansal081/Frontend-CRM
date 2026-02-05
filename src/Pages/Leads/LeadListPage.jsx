import { Link } from "react-router-dom";
import Sidebar from "../../Components/Layout/Sidebar";
import useFetch from "../../customHooks/useFetch";
import "./LeadListPage.css";
import { useState } from "react";

const LeadListPage = () => {
  const { data, loading, error } = useFetch(
    "https://crm-backend-beryl.vercel.app/v1/leads",
  );

  const leads = data ? data : [];

  const [statusFilter, setStatusFilter] = useState("All");
  const [agentFilter, setAgentFilter] = useState("All");
  const [sortBy, setSortBy] = useState("");

  if (loading)
    return (
      <>
        <div>
          <Sidebar />
          <p style={{ paddingTop: "3rem", textAlign: "center" }}>
            Loading leads...
          </p>
        </div>
      </>
    );
  if (error) return <p>Error loading leads</p>;

  let filteredLeads = [...leads];

  if (statusFilter !== "All") {
    filteredLeads = filteredLeads?.filter(
      (lead) => lead.status === statusFilter,
    );
  }

  if (agentFilter !== "All") {
    filteredLeads = filteredLeads?.filter(
      (lead) => lead.salesAgent?.name === agentFilter,
    );
  }

  if (sortBy === "priority") {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    filteredLeads.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
    );
  }

  if (sortBy === "time") {
    filteredLeads.sort((a, b) => a.timeToClose - b.timeToClose);
  }

  const agents = [
    ...new Set(leads.map((l) => l.salesAgent?.name).filter(Boolean)),
  ];

  return (
    <div className="lead-page">
      <Sidebar />

      <div className="lead-content">
        <h2 className="page-title">Lead List</h2>

        <div className="filters">
          <select onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Closed</option>
          </select>

          <select onChange={(e) => setAgentFilter(e.target.value)}>
            <option value="All">All Agents</option>
            {agents.map((agent) => (
              <option key={agent}>{agent}</option>
            ))}
          </select>

          <select onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort By</option>
            <option value="priority">Priority</option>
            <option value="time">Time To Close</option>
          </select>

          <button className="add-btn">
            <Link to={"/leadForm"} className="link">
              Add New Lead{" "}
            </Link>
          </button>
        </div>

        <div className="lead-list mb-4">
          {filteredLeads?.map((lead) => (
            <Link to={`/leads/${lead._id}`} key={lead._id} className="lead-row">
              <div className="lead-name">{lead.name}</div>
              <div className={`status ${lead.status.toLowerCase()}`}>
                {lead.status}
              </div>
              <div className={`priority ${lead.priority?.toLowerCase()}`}>
                {lead.priority}
              </div>
              <div className="agent ms-0 ms-md-4">
                {lead.salesAgent?.name || "Unassigned"}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadListPage;
