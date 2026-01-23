import { Bar, Pie } from "react-chartjs-2";
import useFetch from "../../customHooks/useFetch";

export default function ReportsDashboard() {
  const {
    data: leads = [],
    loading,
    error,
  } = useFetch("https://crm-backend-beryl.vercel.app/v1/leads");

  if (loading) return <p className="main-content-padding">Loading reports...</p>;
  if (error) return <p className="main-content-padding">Failed to load reports</p>;

  const statusColors = [
    "#4CAF50", // New
    "#2196F3", // Contacted
    "#FFC107", // Qualified
    "#9C27B0", // Proposal
    "#F44336", // Closed
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
    if (!dateMap[date]) dateMap[date] = 0;
    dateMap[date]++;
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

  const pipelineCounts = leadStatuses.map(
    (status) => leads.filter((l) => l.status === status).length,
  );

  const pipelineChart = {
    labels: leadStatuses,
    datasets: [
      {
        label: "Lead Status Distribution",
        data: pipelineCounts,
        backgroundColor: statusColors,
      },
    ],
  };



  const agents = {};

  leads.forEach((lead) => {
    const agentName = lead.salesAgent?.name || "Unassigned";
    if (!agents[agentName]) agents[agentName] = 0;
    agents[agentName]++;
  });

  const agentNames = Object.keys(agents);
  const agentCounts = Object.values(agents);

  const agentBarChart = {
    labels: agentNames,
    datasets: [
      {
        label: "Leads By Sales Agent",
        data: agentCounts,
        backgroundColor: agentNames.map(
          (_, i) => agentColors[i % agentColors.length],
        ),
      },
    ],
  };


  const statusCounts = {};
  leads.forEach((lead) => {
    if (!statusCounts[lead.status]) statusCounts[lead.status] = 0;
    statusCounts[lead.status]++;
  });

  const statusLabels = Object.keys(statusCounts);
  const statusValues = Object.values(statusCounts);

  const statusPieChart = {
    labels: statusLabels,
    datasets: [
      {
        label: "Lead Status Distribution",
        data: statusValues,
        backgroundColor: statusLabels.map(
          (status) => statusColors[leadStatuses.indexOf(status)] || "#000000",
        ),
      },
    ],
  };

  return (
    <div className="container py-4" style={{ paddingLeft: "11rem" }}>
      <h2 className="mb-4">Reports & Visualization</h2>

      <div className="mb-5">
        <h5>Leads Closed Last Week</h5>
        <Bar data={closedWeeklyChart} />
      </div>

      <div className="mb-5">
        <h5>Total Leads in Pipeline</h5>
        <Bar data={pipelineChart} />
      </div>

      <div className="mb-5">
        <h5>Leads by Sales Agent</h5>
        <Bar data={agentBarChart} />
      </div>

      <div className="mb-5">
        <h5>Lead Status Distribution</h5>
        <div style={{ width: "900px", height: "600px", margin: "auto" }}>
          <Pie data={statusPieChart} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
}
