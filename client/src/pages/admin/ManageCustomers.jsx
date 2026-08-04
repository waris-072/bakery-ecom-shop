import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import CustomerTable from "../../components/admin/CustomerTable";
import { getCustomers, deleteCustomer } from "../../services/userService";
import ConfirmModal from "../../components/admin/ConfirmModal";
import ViewCustomerModal from "../../components/admin/viewCustomerModal";



function ManageCustomers() {

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [viewCustomer, setViewCustomer] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const { setTopbarConfig } = useOutletContext();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data.customers);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async () => {
    try {
      setLoadingDelete(true);
      await deleteCustomer(selectedCustomer._id);
      await fetchCustomers();
      setSelectedCustomer(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingDelete(false);
    }
  };


  const clearFilters = () => {
    setSearch("");
    setSort("newest");
  };

  useEffect(() => {
    setTopbarConfig({
      title: "Customers",
      search,
      setSearch,
      sort,
      setSort,
      placeholder: "Search customers...",
      actionButton: null,
      clearFilters,
      sortOptions:[
        {value: "newest", label:"Newest",},
        {value: "oldest", label:"Oldest",},
        {value:"az", label:"A → Z",},
        {value:"za", label:"Z → A",},
      ],
    });

    return () => setTopbarConfig({});
  }, [search, sort]);

  const filteredCustomers = [...customers]
    .filter((customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      switch (sort) {
        case "az":
          return a.name.localeCompare(b.name);

        case "za":
          return b.name.localeCompare(a.name);

        case "newest":
          return (
            new Date(b.createdAt) -
            new Date(a.createdAt)
          );

        case "oldest":
          return (
            new Date(a.createdAt) -
            new Date(b.createdAt)
          );

        default:
          return 0;
      }
    });



  if (loading) {
    return <Loader message="Loading customers..." />;
  }


  return (
    <div>
      <CustomerTable
        customers={filteredCustomers}
        onView={setViewCustomer}
        onDelete={setSelectedCustomer}
      />
      {viewCustomer && (
        <ViewCustomerModal
          customer={viewCustomer}
          onClose={() => setViewCustomer(null)}
        />
      )}
      {selectedCustomer && (
        <ConfirmModal
          selectedProduct={selectedCustomer}
          loading={loadingDelete}
          onCancel={() => setSelectedCustomer(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default ManageCustomers;