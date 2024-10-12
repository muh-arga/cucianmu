const {
  doneOrderSchema,
  updateOrderSchema,
} = require("../validators/OrderValidator");

class OrderController {
  constructor(
    addOrderUseCase,
    deleteOrderUseCase,
    doneOrderUseCase,
    getOrderByIdUseCase,
    getOrderByUserIdUseCase,
    updateOrderStatusUseCase,
    updateOrderUseCase
  ) {
    this.addOrderUseCase = addOrderUseCase;
    this.deleteOrderUseCase = deleteOrderUseCase;
    this.doneOrderUseCase = doneOrderUseCase;
    this.getOrderByIdUseCase = getOrderByIdUseCase;
    this.getOrderByUserIdUseCase = getOrderByUserIdUseCase;
    this.updateOrderStatusUseCase = updateOrderStatusUseCase;
    this.updateOrderUseCase = updateOrderUseCase;
  }

  async addOrder(req, res, next) {
    const data = {
      merchantId: req.user.id,
    };

    try {
      const order = await this.addOrderUseCase.execute(data);
      return res.status(201).json({
        message: "Order created successfully",
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateOrder(req, res, next) {
    const data = req.body;
    const { orderId } = req.params;
    const merchantId = req.user.id;

    const { error } = updateOrderSchema.validate(data);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    try {
      const order = await this.updateOrderUseCase.execute(
        orderId,
        merchantId,
        data
      );
      return res.status(200).json({
        message: "Order updated successfully",
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    const { orderId } = req.params;

    try {
      const order = await this.getOrderByIdUseCase.execute(orderId);
      return res.status(200).json({
        message: "Order retrivied successfully",
        data: order,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async findByUserId(req, res, next) {
    const merchantId = req.user.id;

    try {
      const orders = await this.getOrderByUserIdUseCase.execute(merchantId);
      return res.status(200).json({
        message: "Orders retrivied successfully",
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req, res, next) {
    const data = req.body;
    const { orderId } = req.params;
    const merchantId = req.user.id;

    try {
      const order = await this.updateOrderStatusUseCase.execute(
        orderId,
        merchantId,
        data
      );
      return res.status(200).json({
        message: "Order status updated successfully",
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }

  async doneOrder(req, res, next) {
    const data = req.body;
    const { orderId } = req.params;
    const merchantId = req.user.id;

    const { error } = doneOrderSchema.validate(data);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    try {
      const order = await this.doneOrderUseCase.execute(
        orderId,
        merchantId,
        data
      );
      return res.status(200).json({
        message: "Order marked as done successfully",
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteOrder(req, res, next) {
    const { orderId } = req.params;
    const merchantId = req.user.id;

    try {
      await this.deleteOrderUseCase.execute(orderId, merchantId);
      return res.status(200).json({
        message: "Order deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;
