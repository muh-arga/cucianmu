class GetServiceByUserIdUseCase {
  constructor(serviceRepositoryImpl) {
    this.serviceRepository = serviceRepositoryImpl;
  }

  async execute(merchantId) {
    return await this.serviceRepository.findByUserId(merchantId);
  }
}

module.exports = GetServiceByUserIdUseCase;
