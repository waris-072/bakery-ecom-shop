import {
  createOrderService,
  getMyOrdersService,
  getAllOrdersService,
} from "../services/orderService.js";

export const createOrderController = async (
  req,
  res
) => {
  try {
    const order = await createOrderService(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyOrdersController =
  async (req, res) => {
    try {
      const orders =
        await getMyOrdersService(req.user.id);

      res.json({
        success: true,
        orders,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export const getAllOrdersController =
  async (req, res) => {
    try {
      const orders =
        await getAllOrdersService();

      res.json({
        success: true,
        orders,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };