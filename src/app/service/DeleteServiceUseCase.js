const { NotFoundError, ForbiddenError } = require("../../errors");

class DeleteServiceUseCase {
  constructor(serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async execute(serviceId, userId) {
    const service = await this.serviceRepository.findById(serviceId);

    if (!service) {
      throw new NotFoundError("Service not found");
    }

    if (!service.verifyUser(userId)) {
      throw new ForbiddenError("Forbidden", 403);
    }

    return this.serviceRepository.delete(serviceId);
  }
}

module.exports = DeleteServiceUseCase;
