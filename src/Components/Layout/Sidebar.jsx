// Sidebar.jsx
import { Link } from "react-router-dom";
import './Sidebar.css'

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">
        Anvaya<br />CRM
      </h2>

      <nav className="sidebar-nav">
        <Link to="/">Dashboard</Link>
     
        <Link to="/reports">Reports</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
