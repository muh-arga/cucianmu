const Service = require("../../domain/service/Service");
const ServiceRepository = require("../../domain/service/ServiceRepository");

class ServiceRepositoryImpl extends ServiceRepository {
  constructor(prisma) {
    super();
    this.prisma = prisma;
  }

  async findById(id) {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    return service
      ? new Service(
          service.id,
          service.userId,
          service.name,
          service.type,
          service.price,
          service.estimate,
          service.ironed,
          service.user
        )
      : null;
  }

  async findByUserId(id) {
    const services = await this.prisma.service.findMany({
      where: { userId: id },
      include: {
        user: true,
      },
    });

    return services.map(
      (service) =>
        new Service(
          service.id,
          service.userId,
          service.name,
          service.type,
          service.price,
          service.estimate,
          service.ironed,
          service.user
        )
    );
  }

  async findAll() {
    const services = await this.prisma.service.findMany({
      include: {
        user: true,
      },
    });

    return services.map(
      (service) =>
        new Service(
          service.id,
          service.userId,
          service.name,
          service.type,
          service.price,
          service.estimate,
          service.ironed,
          service.user
        )
    );
  }

  async save(service) {
    const newService = await this.prisma.service.create({
      data: {
        userId: service.userId,
        name: service.name,
        type: service.type,
        price: service.price,
        estimate: service.estimate,
        ironed: service.ironed,
      },
    });

    return new Service(
      newService.id,
      newService.userId,
      newService.name,
      newService.type,
      newService.price,
      newService.estimate,
      newService.ironed,
      newService.user
    );
  }

  async update(id, data) {
    const updatedService = await this.prisma.service.update({
      where: { id },
      data: {
        name: data.name,
        type: data.type,
        price: data.price,
        estimate: data.estimate,
        ironed: data.ironed,
      },
    });

    return new Service(
      updatedService.id,
      updatedService.userId,
      updatedService.name,
      updatedService.type,
      updatedService.price,
      updatedService.estimate,
      updatedService.ironed,
      updatedService.user
    );
  }

  async delete(id) {
    await this.prisma.service.delete({
      where: { id },
    });
  }
}

module.exports = ServiceRepositoryImpl;
