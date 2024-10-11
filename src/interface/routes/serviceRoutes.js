const express = require("express");
const router = express.Router();

const ServiceController = require("../controllers/ServiceController");
const AddServiceUseCase = require("../../app/service/AddServiceUseCase");
const UpdateServiceUseCase = require("../../app/service/UpdateServiceUseCase");
const GetServiceByUserIdUseCase = require("../../app/service/GetServiceByUserIdUseCase");
const GetServiceByIdUseCase = require("../../app/service/GetServiceByIdUseCase");
const DeleteServiceUseCase = require("../../app/service/DeleteServiceUseCase");
const serviceRepositoryImpl = require("../../infra/db/ServiceRepositoryImpl");

// Middleware
const authMiddleware = require("../middleware/authMiddleware");

// Dependencies
const prisma = require("../../infra/db/prisma/prismaClient");

// Initialization
const serviceRepository = new serviceRepositoryImpl(prisma);
const addServiceUseCase = new AddServiceUseCase(serviceRepository);
const updateServiceUseCase = new UpdateServiceUseCase(serviceRepository);
const getServiceByUserIdUseCase = new GetServiceByUserIdUseCase(
  serviceRepository
);
const getServiceByIdUseCase = new GetServiceByIdUseCase(serviceRepository);
const deleteServiceUseCase = new DeleteServiceUseCase(serviceRepository);

const serviceController = new ServiceController(
  addServiceUseCase,
  updateServiceUseCase,
  getServiceByUserIdUseCase,
  getServiceByIdUseCase,
  deleteServiceUseCase
);

// Routes
router.post("/service", authMiddleware, (req, res, next) =>
  serviceController.addService(req, res, next)
);
router.put("/service/:serviceId", authMiddleware, (req, res, next) =>
  serviceController.updateService(req, res, next)
);
router.get("/services", authMiddleware, (req, res, next) =>
  serviceController.getServiceByUserId(req, res, next)
);
router.get("/service/:serviceId", authMiddleware, (req, res, next) =>
  serviceController.getServiceById(req, res, next)
);
router.delete("/service/:serviceId", authMiddleware, (req, res, next) =>
  serviceController.deleteService(req, res, next)
);

module.exports = router;
