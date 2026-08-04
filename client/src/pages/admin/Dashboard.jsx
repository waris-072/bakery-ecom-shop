import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { getAllOrders } from "../../services/orderService";
import { getCustomers } from "../../services/userService";
import { getProducts } from "../../services/productService";
import "./Dashboard.css";
import { useOutletContext } from "react-router-dom";



function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  const { setTopbarConfig } = useOutletContext();

  useEffect(() => {
    setTopbarConfig({
      title: "Administration-Dashboard",
      actionButton: null,
      search: null,
      setSearch: null,
      sort: null,
      setSort: null,
      clearFilters: null,
    });
    return () => setTopbarConfig({});
  }, []);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [productData, orderData, customerData] = await Promise.all([
          getProducts(),
          getAllOrders(),
          getCustomers(),
        ]);

        setProducts(productData.products || []);
        setOrders(orderData.orders || []);
        setCustomers(customerData.customers || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const stats = useMemo(() => {
    const delivered = orders.filter(order => order.status === "Delivered");
    const pending = orders.filter(order => order.status === "Pending");
    const preparing = orders.filter(order => order.status === "Preparing");
    const confirmed = orders.filter(order => order.status === "Confirmed");
    const cancelled = orders.filter(order => order.status === "Cancelled");

    return {
      revenue: delivered.reduce((sum, order) => sum + order.total, 0),
      delivered: delivered.length,
      pending: pending.length,
      preparing: preparing.length,
      confirmed: confirmed.length,
      cancelled: cancelled.length,
      totalOrders: orders.length,
    };
  }, [orders]);

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [orders]);

  const orderStatusCounts = useMemo(() => {
    const counts = {};
    orders.forEach(order => {
      counts[order.status] = (counts[order.status] || 0) + 1;
    });
    return counts;
  }, [orders]);

  if (loading) {
    return <Loader message="Loading dashboard..." />;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="header-left">
          <h1>Dashboard</h1>
          <p>Welcome back! Here's what's happening with your store</p>
        </div>
        <div className="header-right">
          <span className="date-badge">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card revenue-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h4>Total Revenue</h4>
            <h2>Rs. {stats.revenue.toLocaleString()}</h2>
            <span className="stat-sub">{stats.delivered} delivered orders</span>
          </div>
        </div>

        <div className="stat-card orders-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h4>Total Orders</h4>
            <h2>{stats.totalOrders}</h2>
            <span className="stat-sub">{stats.pending} pending</span>
          </div>
        </div>

        <div className="stat-card customers-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h4>Customers</h4>
            <h2>{customers.length}</h2>
            <span className="stat-sub">Active customers</span>
          </div>
        </div>

        <div className="stat-card products-card">
          <div className="stat-icon">🛍️</div>
          <div className="stat-content">
            <h4>Products</h4>
            <h2>{products.length}</h2>
            <span className="stat-sub">In inventory</span>
          </div>
        </div>
      </div>

      <div className="status-breakdown">
        <h3>Order Status Breakdown</h3>
        <div className="status-bars">
          {Object.entries(orderStatusCounts).map(([status, count]) => (
            <div key={status} className="status-bar-item">
              <div className="status-bar-label">
                <span className={`status-dot ${status.toLowerCase().replace(/\s+/g, '-')}`}></span>
                <span>{status}</span>
                <span className="status-count">{count}</span>
              </div>
              <div className="status-bar-track">
                <div
                  className={`status-bar-fill ${status.toLowerCase().replace(/\s+/g, '-')}`}
                  style={{
                    width: `${(count / stats.totalOrders) * 100}%`,
                    minWidth: '4px'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section orders-section">
          <div className="section-header">
            <h2>Recent Orders</h2>
            <Link to="/admin/orders" className="view-all-btn">
              View All →
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="empty-state">
              <p>No orders yet</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order._id}>
                      <td className="order-id">
                        #{order._id.slice(-6).toUpperCase()}
                      </td>
                      <td>
                        <div className="customer-info">
                          <span className="customer-name">{order.customer?.name || "Deleted User"}</span>
                          <span className="customer-email">{order.customer?.email || "-"}</span>
                        </div>
                      </td>
                      <td className="order-total">
                        Rs. {order.total.toLocaleString()}
                      </td>
                      <td>
                        <span className={`status-badge ${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="order-date">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;