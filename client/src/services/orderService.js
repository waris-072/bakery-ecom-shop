import api from "../api/axios";

export const createOrder = async (orderData) => {
  const { data } = await api.post("/orders", orderData);
  return data;
};

export const getMyOrders = async () => {
  const { data } = await api.get("/orders/my-orders");
  return data;
};

export const getAllOrders = async () => {
  const { data } = await api.get("/orders");
  return data;
};

export const updateOrderStatus = async (id, status) => {
  const { data } = await api.patch( `/orders/${id}/status`, { status } );
  return data;
};