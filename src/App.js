import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LeadForm from "./Components/Features/LeadForm";
import LeadManagementPage from './Pages/Leads/LeadManagementPage'
import DashboardLayout from './Pages/Dashboard/Dashboard'
import LeadListPage from './Pages/Leads/LeadListPage'
import SalesAgentPage from "./Pages/SalesAgentPage";
import SalesAgentForm from "./Components/Features/SalesAgentForm";
import ReportsPage from "./Pages/ReportsPage";
import LeadsByStatus from "./Pages/LeadStatusViewPage";
import LeadsByAgent from "./Pages/SalesAgentViewPage";
import SettingPage from './Pages/Setting'
import LeadStatusView from './Components/Features/LeadStatusView'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element : <DashboardLayout/>
    },
    {
      
      path: "/leadForm",
      element: <LeadForm />,
    },
    {
      path : '/leads/:leadId',
      element : <LeadManagementPage/>
    },
    {
      path: "/leadList",
      element: <LeadListPage />,
    },
    {
      path: "/agents",
      element: <SalesAgentPage />,
    },
    {
      path: "/agentForm",
      element: <SalesAgentForm />,
    },
    {
      path: "/reports",
      element: <ReportsPage />,
    },
    {
      path : '/leads/status',
      element : <LeadsByStatus/>
    },
     {
      path : '/leads/agents',
      element : <LeadsByAgent/>
    },
    {
      path : '/settings',
      element : <SettingPage/>
    },
     {
      path : '/demo',
      element : <LeadStatusView/>
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
