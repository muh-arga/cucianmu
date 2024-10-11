class GetServiceByUserIdUseCase {
  constructor(serviceRepositoryImpl) {
    this.serviceRepository = serviceRepositoryImpl;
  }

  async execute(userId) {
    return await this.serviceRepository.findByUserId(userId);
  }
}

module.exports = GetServiceByUserIdUseCase;
