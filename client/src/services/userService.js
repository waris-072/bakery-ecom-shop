import api from "../api/axios";

export const getCustomers = async () => {
    const { data } = await api.get("/users/customers");
    return data;
};

export const deleteCustomer = async (id) => {
  const { data } = await api.delete(`/users/${id}`);
  return data;
};