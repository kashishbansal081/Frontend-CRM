import Sidebar from "../Components/Layout/Sidebar";
import ReportsDashboard from "../Components/Features/ReportsDashboard";

export default function ReportsPage() {
  return (
    <>
      <style>
        {`
          .reports-wrapper {
            display: flex;
            flex-direction: column;
          }

          @media (min-width: 770px) {
            .reports-wrapper {
              flex-direction: row;
            }
              

            .reports-content {
              margin-left: 15rem;
              width: calc(100% - 15rem);
            }
          }
        `}
      </style>

      <div className="reports-wrapper">
        <Sidebar />
        <div className="reports-content">
          <ReportsDashboard />
        </div>
      </div>
    </>
  );
}
