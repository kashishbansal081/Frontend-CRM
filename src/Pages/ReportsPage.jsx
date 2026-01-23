import Sidebar from "../Components/Layout/Sidebar";
import ReportsDashboard from "../Components/Features/ReportsDashboard";

export default function ReportsPage(){
    return (
        <div className="d-flex">
        <Sidebar/>
        <ReportsDashboard/>
        </div>
    )
}