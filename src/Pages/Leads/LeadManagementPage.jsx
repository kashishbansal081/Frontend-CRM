import { useParams } from "react-router-dom";
import LeadDetails from "../../Components/Features/LeadDetails";
import useFetch from "../../customHooks/useFetch";
import Sidebar from "../../Components/Layout/Sidebar";

const LeadManagement = () => {
  const { leadId } = useParams();
  const { data } = useFetch(
    `https://crm-backend-beryl.vercel.app/v1/leads`
  );

  const lead = data && data.find((lead) => lead._id === leadId);

  return (
    <div className="lead-page">
      <Sidebar />

      <div className="lead-content">
        <h2 className="page-title">
          Lead Management: {lead?.name}
        </h2>

        <LeadDetails lead={lead} />
      </div>
    </div>
  );
};

export default LeadManagement;
