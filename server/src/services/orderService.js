import Order from "../models/Order.js";
import User from "../models/user.js";

export const createOrderService = async ( userId, data ) => {
    const { phone, address, products, subtotal, shipping, total, } = data;

    await User.findByIdAndUpdate(userId, { phone, address, });

    return await Order.create({
        customer: userId,
        phone,
        address,
        products,
        subtotal,
        shipping,
        total,
    });
};

export const getMyOrdersService = async (
    userId
) => {
    return await Order.find({
        customer: userId,
    }).sort({ createdAt: -1 });
};

export const getAllOrdersService = async () => {
    return await Order.find()
        .populate("customer", "name email")
        .sort({ createdAt: -1 });
};

export const updateOrderStatusService = async (id, status) => {
    const order = await Order.findById(id);

    if (!order) {
        throw new Error("Order not found");
    }

    order.status = status;
    await order.save();
    return order;
};