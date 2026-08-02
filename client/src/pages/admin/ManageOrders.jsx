import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";

import Loader from "../../components/loader/Loader";
import OrderTable from "../../components/admin/OrderTable";
import ViewOrderModal from "../../components/admin/ViewOrderModal";

import { getAllOrders } from "../../services/orderService";

function ManageOrders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [sort, setSort] = useState("newest");
  const { setTopbarConfig } = useOutletContext();


  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

    const clearFilters = () => {
    setSearch("");
    setSort("newest");
  };
  
  useEffect(() => {
    setTopbarConfig({
      title: "Manage Orders",
      search,
      setSearch,
      sort,
      setSort,
      placeholder: "Search orders...",
      actionButton: null,
      clearFilters,
      sortOptions: [
        { value: "newest", label: "Newest", },
        { value: "oldest", label: "Oldest", },
        { value: "pending", label: "Pending", },
        { value: "confirmed", label: "Confirmed", },
        { value: "preparing", label: "Preparing", },
        {value: "delivery",label: "Out for Delivery",},
        { value: "delivered", label: "Delivered", },
        {value: "cancelled",label: "Cancelled",},
      ],
    });
    return () => setTopbarConfig({});
  }, [search, sort]);


  useEffect(() => {
    fetchOrders();
  }, []);

   const filteredOrders = useMemo(() => {
    let filtered = [...orders];
    
    // 1. Apply Search
    if (search) {
      filtered = filtered.filter((order) =>
        order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(search.toLowerCase()) ||
        order._id.includes(search)
      );
    }

    // 2. Apply Sorting
    switch (sort) {
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;

      case "pending":
        // FIX: Explicitly check BOTH a and b to prevent random shuffling
        filtered.sort((a, b) => {
          if (a.status === "Pending" && b.status !== "Pending") return -1;
          if (b.status === "Pending" && a.status !== "Pending") return 1;
          return 0; // Keep existing order if both are the same
        });
        break;

      case "confirmed":
        filtered.sort((a, b) => {
          if (a.status === "Confirmed" && b.status !== "Confirmed") return -1;
          if (b.status === "Confirmed" && a.status !== "Confirmed") return 1;
          return 0;
        });
        break;

      case "preparing":
        filtered.sort((a, b) => {
          if (a.status === "Preparing" && b.status !== "Preparing") return -1;
          if (b.status === "Preparing" && a.status !== "Preparing") return 1;
          return 0;
        });
        break;

      case "delivery":
        filtered.sort((a, b) => {
          if (a.status === "Out for Delivery" && b.status !== "Out for Delivery") return -1;
          if (b.status === "Out for Delivery" && a.status !== "Out for Delivery") return 1;
          return 0;
        });
        break;

      case "delivered":
        filtered.sort((a, b) => {
          if (a.status === "Delivered" && b.status !== "Delivered") return -1;
          if (b.status === "Delivered" && a.status !== "Delivered") return 1;
          return 0;
        });
        break;

      case "cancelled":
        filtered.sort((a, b) => {
          if (a.status === "Cancelled" && b.status !== "Cancelled") return -1;
          if (b.status === "Cancelled" && a.status !== "Cancelled") return 1;
          return 0;
        });
        break;

      default:
        // Default: Newest first (Original code, works fine)
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return filtered;
  }, [orders, search, sort]);

  if (loading)
    return (
      <Loader message="Loading orders..." />
    );



  return (

    <div className="admin-page">
      <OrderTable
        orders={filteredOrders}
        onView={setSelectedOrder}
      />

      {
        selectedOrder && (

          <ViewOrderModal

            order={selectedOrder}

            onClose={() =>
              setSelectedOrder(null)
            }

            refreshOrders={fetchOrders}

          />

        )
      }

    </div>

  );

}

export default ManageOrders;