import StatsCard from "../../components/admin/StatsCard";
import "./Admin.css";

function Dashboard() {
  return (
    <div className="admin-dashboard">
      <h1>
        Dashboard
      </h1>

      <div className="stats-container">
        
        <StatsCard title="Products" value="0" />
        <StatsCard title="Orders" value="0" />
        <StatsCard title="Customers" value="0" />
        <StatsCard title="Revenue" value="$0" />

      </div>
    </div>
  );
}


export default Dashboard;