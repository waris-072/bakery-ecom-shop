import api from "../api/axios";

export const getProducts = async () => {
  const { data } = await api.get("/products");

  return data;
};

export const getProduct = async (id) => {
  const { data } = await api.get(`/products/${id}`);

  return data;
};


export const createProduct = async (productData) => {
  const { data } = await api.post("/products", productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const updateProduct = async (id, productData) => {
  const { data } = await api.put(`/products/${id}`, productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

