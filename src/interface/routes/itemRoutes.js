const express = require("express");
const router = express.Router();

const ItemController = require("../controllers/ItemController");
const AddItemUseCase = require("../../app/item/AddItemUseCase");
const DeleteItemUseCase = require("../../app/item/DeleteItemUseCase");
const ItemRepositoryImpl = require("../../infra/db/ItemRepositoryImpl");
const OrderRepositoryImpl = require("../../infra/db/OrderRepositoryImpl");
const ServiceRepositoryImpl = require("../../infra/db/ServiceRepositoryImpl");

// Middleware
const authMiddleware = require("../middleware/authMiddleware");

// Dependencies
const prisma = require("../../infra/db/prisma/prismaClient");

// Initialization
const itemRepository = new ItemRepositoryImpl(prisma);
const orderRepository = new OrderRepositoryImpl(prisma);
const serviceRepository = new ServiceRepositoryImpl(prisma);
const addItemUseCase = new AddItemUseCase(
  itemRepository,
  orderRepository,
  serviceRepository
);
const deleteItemUseCase = new DeleteItemUseCase(
  itemRepository,
  orderRepository
);
const itemController = new ItemController(addItemUseCase, deleteItemUseCase);

// Routes
router.post("/", authMiddleware, (req, res, next) =>
  itemController.addItem(req, res, next)
);
router.delete("/:itemId", authMiddleware, (req, res, next) =>
  itemController.deleteItem(req, res, next)
);

module.exports = router;
