class AddOrderUseCase {
  constructor(orderRepositoryImpl) {
    this.orderRepository = orderRepositoryImpl;
  }

  async execute(data) {
    const latest = await this.orderRepository.findLatest(data.merchantId);
    if (!latest) {
      data.number = "00000001";
    } else {
      const number = parseInt(latest.number) + 1;
      data.number = number.toString().padStart(8, "0");
    }

    const order = await this.orderRepository.save(data);
    return order;
  }
}

module.exports = AddOrderUseCase;
