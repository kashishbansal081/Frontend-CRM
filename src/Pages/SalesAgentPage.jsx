import Sidebar from "../Components/Layout/Sidebar";
import { Link } from "react-router-dom";
import useFetch from "../customHooks/useFetch";

export default function SalesAgentPage() {
  const {
    data: agents,
    loading,
    error
  } = useFetch("https://crm-backend-beryl.vercel.app/v1/agents");

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 main-content-padding">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Sales Agent List</h2>
          <Link to="/agentForm">
            <button className="btn btn-primary">+ Add New Agent</button>
          </Link>
        </div>

        <div className="card shadow-sm w-100">
          <div className="card-body">
            {loading && <p>Loading agents...</p>}

            {error && (
              <p className="text-danger">Failed to load agents</p>
            )}

            {!loading && agents.length === 0 && (
              <p className="text-muted">No sales agents found.</p>
            )}

            {!loading &&
              agents.map((agent) => (
                <div
                  key={agent._id}
                  className="border-bottom py-3"
                >
                  <div>
                    <h6 className="mb-1">{agent.name}</h6>
                    <small className="text-muted">{agent.email}</small>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
