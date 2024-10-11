const { NotFoundError, ForbiddenError } = require("../../errors");

class DeleteServiceUseCase {
  constructor(serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async execute(serviceId, merchantId) {
    const service = await this.serviceRepository.findById(serviceId);

    if (!service) {
      throw new NotFoundError("Service not found");
    }

    if (!service.verifyUser(merchantId)) {
      throw new ForbiddenError("Forbidden", 403);
    }

    return this.serviceRepository.delete(serviceId);
  }
}

module.exports = DeleteServiceUseCase;
