class GetOrderByUserIdUseCase {
  constructor(orderRepositoryImpl) {
    this.orderRepository = orderRepositoryImpl;
  }

  async execute(merchantId) {
    const orders = await this.orderRepository.findByUserId(merchantId);
    return orders;
  }
}

module.exports = GetOrderByUserIdUseCase;
