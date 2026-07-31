import User from "../models/User.js";

export const getCustomersService = async () => {
  return await User.find(
    { role: "customer" },
    "-password -refreshToken"
  ).sort({ createdAt: -1 });
};

export const deleteCustomerService = async (id) => {
  return await User.findByIdAndDelete(id);
};