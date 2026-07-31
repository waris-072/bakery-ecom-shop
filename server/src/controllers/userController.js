import { getCustomersService, deleteCustomerService } from "../services/userService.js";

export const getCustomersController = async (req, res) => {
  try {
    const customers = await getCustomersService();

    res.status(200).json({
      success: true,
      customers,
    });
  } catch (error) {
    console.error("Customers Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteCustomerController = async (req, res) => {
  try {
    await deleteCustomerService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};