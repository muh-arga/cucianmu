const {
  NotFoundError,
  ForbiddenError,
  BadRequestError,
} = require("../../errors");

class UpdateOrderStatusUseCase {
  constructor(orderRepositoryImpl) {
    this.orderRepository = orderRepositoryImpl;
  }

  async execute(orderId, merchantId) {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new NotFoundError("Order not found");
    }

    if (!order.verifyUser(merchantId)) {
      throw new ForbiddenError("Forbidden");
    }

    if (order.status > 3) {
      throw new BadRequestError("Cannot update status anymore, Done Order!!");
    }

    order.status += 1;

    return await this.orderRepository.update(orderId, order);
  }
}

module.exports = UpdateOrderStatusUseCase;
