import Sidebar from "../Components/Layout/Sidebar";
import { Link } from "react-router-dom";
import useFetch from "../customHooks/useFetch";

export default function SalesAgentPage() {
  const {
    data: agents = [],
    loading,
    error,
  } = useFetch("https://crm-backend-beryl.vercel.app/v1/agents");

  return (
    <>
      <style>
        {`
          @media (min-width: 769px) {
            .right-container-margin {
              margin-left: 15rem !important;
              max-width: 650px !important;
            }
          }

           @media (min-width: 1300px) {
            .right-container-margin {
              margin-left: 15rem !important;
              max-width: 1000px !important;
            }
          }

          @media (max-width: 769px) {
            .salesAgentAddBtn {
            width: 100%;
            }
            button{
            width: 100%;
            }
          }
        `}
      </style>

      <div className="d-flex flex-column flex-lg-row min-vh-100 bg-light">
        <Sidebar />

        <div className="flex-grow-1 p-3 p-lg-5 d-flex flex-column align-items-center align-items-lg-stretch">

          <div className="w-100 right-container-margin" style={{ maxWidth: "1000px" }}>

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-5">
              <h2 className="mb-0">Sales Agent List</h2>
              <Link to="/agentForm" className="salesAgentAddBtn">
                <button className="btn btn-primary w-20 align-items-end">
                  + Add New Agent
                </button>
              </Link>
            </div>

            <div className="card shadow-sm w-100 mb-4 mb-md-0">
              <div className="card-body p-3 p-md-4">
                {loading && <p className="text-center">Loading agents...</p>}

                {error && <p className="text-danger text-center">Failed to load agents</p>}

                {!loading && agents.length === 0 && (
                  <p className="text-muted text-center">No sales agents found.</p>
                )}

                {!loading &&
                  agents.map((agent) => (
                    <div
                      key={agent._id}
                      className="border-bottom py-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center"
                    >
                      <h6 className="mb-1">{agent.name}</h6>
                      <small className="text-muted">{agent.email}</small>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
