import { useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import useFetch from "../../customHooks/useFetch";
import Loader from '../../Components/Features/Spinner'

const DashboardLayout = () => {
  const [activeStatus, setActiveStatus] = useState("All");
  const { data, loading, error } = useFetch(
    "https://crm-backend-beryl.vercel.app/v1/leads",
  );

  const leads = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
      ? data.data
      : [];

  const statuses = ["New", "Contacted", "Qualified", "Closed"];

  const filteredLeads =
    activeStatus === "All"
      ? leads
      : leads.filter((l) => l.status === activeStatus);

  const getCount = (status) => leads.filter((l) => l.status === status).length;

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2 className="logo">Anvaya CRM</h2>
        <nav>
          <Link to={"/"} style={{ color: "white", textDecoration: "none" }}>
            <p>Leads</p>
          </Link>
          <Link
            to={"/leadlist"}
            style={{ color: "white", textDecoration: "none" }}
          >
            <p>Sales</p>
          </Link>
          <Link
            to={"/agents"}
            style={{ color: "white", textDecoration: "none" }}
          >
            <p>Agents</p>
          </Link>
          <Link
            to={"/reports"}
            style={{ color: "white", textDecoration: "none" }}
          >
            <p>Reports</p>
          </Link>
          <Link
            to={"/settings"}
            style={{ color: "white", textDecoration: "none" }}
          >
            <p>Settings</p>
          </Link>
        </nav>
      </aside>

      <main className="main" style={{ paddingLeft: "17rem" }}>
        <h2 className="title">Dashboard</h2>

        {loading && (
            <Loader text = 'Loading leads...'></Loader>
        )}

        {!loading && (
          <>
            <section className="filters my-4">
              <button onClick={() => setActiveStatus("All")}>All</button>
              {statuses.map((s) => (
                <button
                  key={s}
                  className={activeStatus === s ? "active" : ""}
                  onClick={() => setActiveStatus(s)}
                >
                  {s}
                </button>
              ))}
            </section>

            <section className="cards">
              {filteredLeads.map((lead) => (
                <Link to={`/leads/${lead._id}`} className="linkLead">
                  <div key={lead._id} className="card">
                    <h4>{lead.name}</h4>
                    <span className={`status ${lead.status.toLowerCase()}`}>
                      {lead.status}
                    </span>
                    <p>Priority: {lead.priority}</p>
                    <p>
                      Agent:{" "}
                      {lead.salesAgent
                        ? lead.salesAgent.name
                        : "Lead not assigned"}
                    </p>
                  </div>
                </Link>
              ))}
            </section>

            <section className="status-overview">
              <h3>Lead Status Overview</h3>

              <div className="status-card new">
                <div>
                  <h4>New</h4>
                  <p className="desc">Fresh leads requiring first contact</p>
                  <p className="action">📅 Action needed today</p>
                </div>
                <span className="count">{getCount("New")}</span>
              </div>

              <div className="status-card contacted">
                <div>
                  <h4>Contacted</h4>
                  <p className="desc">
                    Leads reached out to, awaiting response
                  </p>
                  <p className="action">📞 Follow up pending</p>
                </div>
                <span className="count">{getCount("Contacted")}</span>
              </div>

              <div className="status-card qualified">
                <div>
                  <h4>Qualified</h4>
                  <p className="desc">Leads ready for conversion</p>
                  <p className="action">✅ High intent</p>
                </div>
                <span className="count">{getCount("Qualified")}</span>
              </div>

              <div className="status-card closed">
                <div>
                  <h4>Closed</h4>
                  <p className="desc">Leads successfully closed</p>
                  <p className="action">🎉 Completed</p>
                </div>
                <span className="count">{getCount("Closed")}</span>
              </div>
            </section>
          </>
        )}

        <Link to={"/leadform"} className="link">
          <button className="add-btn mb-4">+ Add New Lead</button>
        </Link>
        
      </main>
    </div>
  );
};

export default DashboardLayout;
