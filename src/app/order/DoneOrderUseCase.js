const {
  NotFoundError,
  ForbiddenError,
  BadRequestError,
} = require("../../errors");

class DoneOrderUseCase {
  constructor(orderRepositoryImpl) {
    this.orderRepository = orderRepositoryImpl;
  }

  async execute(orderId, merchantId, data) {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new NotFoundError("Order not found");
    }

    if (!order.verifyUser(merchantId)) {
      throw new ForbiddenError("Forbidden");
    }

    if (order.status !== 4) {
      throw new BadRequestError("Cannot mark order as done");
    }

    data.status = 5;
    data.doneAt = new Date().toISOString();

    data.returned = data.paid - order.total;

    return await this.orderRepository.update(orderId, data);
  }
}

module.exports = DoneOrderUseCase;
