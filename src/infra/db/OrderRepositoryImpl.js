const Order = require("../../domain/order/Order");
const OrderRepository = require("../../domain/order/OrderRepository");

class OrderRepositoryImpl extends OrderRepository {
  constructor(prisma) {
    super();
    this.prisma = prisma;
  }

  async findById(id) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            service: true,
          },
        },
      },
    });

    return order
      ? new Order(
          order.id,
          order.number,
          order.status,
          order.merchantId,
          order.customerName,
          order.customerPhone,
          order.estDone,
          order.doneAt,
          order.paymentStatus,
          order.paymentMethod,
          order.total,
          order.paid,
          order.returned,
          order.items,
          order.createdAt,
          order.updatedAt
        )
      : null;
  }

  async findByNumber(number) {
    const order = await this.prisma.order.findUnique({
      where: { number },
      include: {
        merchant: true,
        items: {
          include: {
            service: true,
          },
        },
      },
    });

    return order
      ? new Order(
          order.id,
          order.number,
          order.status,
          order.merchantId,
          order.merchant,
          order.customerName,
          order.customerPhone,
          order.estDone,
          order.doneAt,
          order.paymentStatus,
          order.paymentMethod,
          order.total,
          order.paid,
          order.returned,
          order.items,
          order.createdAt,
          order.updatedAt
        )
      : null;
  }

  async findByUserId(merchantId) {
    const orders = await this.prisma.order.findMany({
      where: { merchantId },
      include: {
        items: {
          include: {
            service: true,
          },
        },
      },
    });

    return orders.map(
      (order) =>
        new Order(
          order.id,
          order.number,
          order.status,
          order.merchantId,
          order.customerName,
          order.customerPhone,
          order.estDone,
          order.doneAt,
          order.paymentStatus,
          order.paymentMethod,
          order.total,
          order.paid,
          order.returned,
          order.items,
          order.createdAt,
          order.updatedAt
        )
    );
  }

  async findAll() {
    const orders = await this.prisma.order.findMany({
      include: {
        items: {
          include: {
            service: true,
          },
        },
      },
    });
    return orders.map(
      (order) =>
        new Order(
          order.id,
          order.number,
          order.status,
          order.merchantId,
          order.customerName,
          order.customerPhone,
          order.estDone,
          order.doneAt,
          order.paymentStatus,
          order.paymentMethod,
          order.total,
          order.paid,
          order.returned,
          order.items,
          order.createdAt,
          order.updatedAt
        )
    );
  }

  async findLatest() {
    const order = await this.prisma.$queryRaw`
      SELECT * FROM "Order"
      ORDER BY CAST("number" AS INTEGER) DESC
      LIMIT 1;
    `;

    return order.length > 0
      ? new Order(
          order[0].id,
          order[0].number,
          order[0].status,
          order[0].merchantId,
          order[0].customerName,
          order[0].customerPhone,
          order[0].estDone,
          order[0].doneAt,
          order[0].paymentStatus,
          order[0].paymentMethod,
          order[0].total,
          order[0].paid,
          order[0].returned,
          order[0].createdAt,
          order[0].updatedAt
        )
      : null;
  }

  async save(order) {
    const newOrder = await this.prisma.order.create({
      data: {
        number: order.number,
        merchantId: order.merchantId,
      },
    });

    return new Order(
      newOrder.id,
      newOrder.number,
      newOrder.status,
      newOrder.merchantId,
      newOrder.customerName,
      newOrder.customerPhone,
      newOrder.estDone,
      newOrder.doneAt,
      newOrder.paymentStatus,
      newOrder.paymentMethod,
      newOrder.total,
      newOrder.paid,
      newOrder.returned,
      newOrder.createdAt,
      newOrder.updatedAt
    );
  }

  async update(id, data) {
    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: {
        status: data.status,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        estDone: data.estDone,
        doneAt: data.doneAt,
        paymentStatus: data.paymentStatus,
        paymentMethod: data.paymentMethod,
        total: data.total,
        paid: data.paid,
        returned: data.returned,
      },
    });

    return new Order(
      updatedOrder.id,
      updatedOrder.number,
      updatedOrder.status,
      updatedOrder.merchantId,
      updatedOrder.customerName,
      updatedOrder.customerPhone,
      updatedOrder.estDone,
      updatedOrder.doneAt,
      updatedOrder.paymentStatus,
      updatedOrder.paymentMethod,
      updatedOrder.total,
      updatedOrder.paid,
      updatedOrder.returned,
      updatedOrder.createdAt,
      updatedOrder.updatedAt
    );
  }

  async delete(id) {
    await this.prisma.order.delete({
      where: { id },
    });
  }
}

module.exports = OrderRepositoryImpl;
