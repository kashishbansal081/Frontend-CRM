import { Bar, Pie } from "react-chartjs-2";
import useFetch from "../../customHooks/useFetch";

export default function ReportsDashboard() {
  const {
    data: leads = [],
    loading,
    error,
  } = useFetch("https://crm-backend-beryl.vercel.app/v1/leads");

  if (loading) return <p className="text-center mt-4">Loading reports...</p>;
  if (error) return <p className="text-center mt-4">Failed to load reports</p>;

  const statusColors = [
    "#4CAF50",
    "#2196F3",
    "#FFC107",
    "#9C27B0",
    "#F44336",
  ];

  const agentColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#8BC34A",
    "#FF9800",
    "#9C27B0",
    "#00BCD4",
    "#E91E63",
    "#4CAF50",
    "#3F51B5",
  ];

  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);

  const leadsClosedLastWeek = leads.filter(
    (lead) =>
      new Date(lead.updatedAt) >= oneWeekAgo &&
      new Date(lead.updatedAt) <= today,
  );

  const dateMap = {};
  leadsClosedLastWeek.forEach((lead) => {
    const date = new Date(lead.updatedAt).toLocaleDateString();
    dateMap[date] = (dateMap[date] || 0) + 1;
  });

  const closedWeeklyChart = {
    labels: Object.keys(dateMap),
    datasets: [
      {
        label: "Leads Closed Last Week",
        data: Object.values(dateMap),
        backgroundColor: "#9C27B0",
      },
    ],
  };

  const leadStatuses = ["New", "Contacted", "Qualified", "Proposal", "Closed"];

  const pipelineChart = {
    labels: leadStatuses,
    datasets: [
      {
        label: "Lead Status Distribution",
        data: leadStatuses.map(
          (status) => leads.filter((l) => l.status === status).length,
        ),
        backgroundColor: statusColors,
      },
    ],
  };

  const agents = {};
  leads.forEach((lead) => {
    const name = lead.salesAgent?.name || "Unassigned";
    agents[name] = (agents[name] || 0) + 1;
  });

  const agentBarChart = {
    labels: Object.keys(agents),
    datasets: [
      {
        label: "Leads By Sales Agent",
        data: Object.values(agents),
        backgroundColor: Object.keys(agents).map(
          (_, i) => agentColors[i % agentColors.length],
        ),
      },
    ],
  };

  const statusCounts = {};
  leads.forEach((lead) => {
    statusCounts[lead.status] = (statusCounts[lead.status] || 0) + 1;
  });

  const statusPieChart = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: Object.keys(statusCounts).map(
          (s) => statusColors[leadStatuses.indexOf(s)] || "#000",
        ),
      },
    ],
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Reports & Visualization</h2>

      <div className="mb-5">
        <h5>Leads Closed Last Week</h5>
        <div className="chart-container">
          <Bar data={closedWeeklyChart} />
        </div>
      </div>

      <div className="mb-5">
        <h5>Total Leads in Pipeline</h5>
        <div className="chart-container">
          <Bar data={pipelineChart} />
        </div>
      </div>

      <div className="mb-5">
        <h5>Leads by Sales Agent</h5>
        <div className="chart-container">
          <Bar data={agentBarChart} />
        </div>
      </div>

      <div className="mb-5">
        <h5>Lead Status Distribution</h5>
        <div className="pie-container">
          <Pie data={statusPieChart} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
}
