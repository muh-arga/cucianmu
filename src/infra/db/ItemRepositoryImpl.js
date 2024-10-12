const Item = require("../../domain/item/Item");
const ItemRepository = require("../../domain/item/ItemRepository");

class ItemRepositoryImpl extends ItemRepository {
  constructor(prisma) {
    super();
    this.prisma = prisma;
  }

  async findById(id) {
    const item = await this.prisma.item.findUnique({
      where: { id },
      include: {
        service: true,
      },
    });

    return item
      ? new Item(
          item.id,
          item.orderId,
          item.type,
          item.serviceId,
          item.amount,
          item.total,
          item.service,
          item.createdAt,
          item.updatedAt
        )
      : null;
  }

  async save(data) {
    const newItem = await this.prisma.item.create({
      data: {
        orderId: data.orderId,
        type: data.type,
        serviceId: data.serviceId,
        amount: data.amount,
        total: data.total,
      },
    });

    return new Item(
      newItem.id,
      newItem.orderId,
      newItem.type,
      newItem.serviceId,
      newItem.amount,
      newItem.total,
      newItem.service,
      newItem.createdAt,
      newItem.updatedAt
    );
  }

  async delete(id) {
    await this.prisma.item.delete({
      where: { id },
    });
  }
}

module.exports = ItemRepositoryImpl;
