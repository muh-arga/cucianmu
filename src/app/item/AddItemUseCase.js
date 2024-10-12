const { NotFoundError, ForbiddenError } = require("../../errors");

class AddItemUseCase {
  constructor(itemRepositoryImpl, orderRepositoryImpl, serviceRepositoryImpl) {
    this.itemRepository = itemRepositoryImpl;
    this.orderRepository = orderRepositoryImpl;
    this.serviceRepository = serviceRepositoryImpl;
  }

  async execute(data, merchantId) {
    const order = await this.orderRepository.findById(data.orderId);
    if (!order) {
      throw new NotFoundError("Order not found");
    }

    if (!order.verifyUser(merchantId)) {
      throw new ForbiddenError("Forbidden");
    }

    const service = await this.serviceRepository.findById(data.serviceId);
    if (!service) {
      throw new NotFoundError("Service not found");
    }

    if (!service.verifyUser(merchantId)) {
      throw new ForbiddenError("Forbidden");
    }

    const total = service.price * data.amount;
    data.total = total;

    const item = await this.itemRepository.save(data);

    const orderTotal = order.total + total;
    await this.orderRepository.update(order.id, { total: orderTotal });

    return item;
  }
}

module.exports = AddItemUseCase;
