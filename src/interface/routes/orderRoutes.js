const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/OrderController");
const AddOrderUseCase = require("../../app/order/AddOrderUseCase");
const DeleteOrderUseCase = require("../../app/order/DeleteOrderUseCase");
const DoneOrderUseCase = require("../../app/order/DoneOrderUseCase");
const GetOrderByIdUseCase = require("../../app/order/GetOrderByIdUseCase");
const GetOrderByUserIdUseCase = require("../../app/order/GetOrderByUserIdUseCase");
const UpdateOrderStatusUseCase = require("../../app/order/UpdateOrderStatusUseCase");
const UpdateOrderUseCase = require("../../app/order/UpdateOrderUseCase");
const TrackOrderUseCase = require("../../app/order/TrackOrderUseCase");
const OrderRepositoryImpl = require("../../infra/db/OrderRepositoryImpl");

// Middleware
const authMiddleware = require("../middleware/authMiddleware");

// Dependencies
const prisma = require("../../infra/db/prisma/prismaClient");

// Initialization
const orderRepository = new OrderRepositoryImpl(prisma);
const addOrderUseCase = new AddOrderUseCase(orderRepository);
const deleteOrderUseCase = new DeleteOrderUseCase(orderRepository);
const doneOrderUseCase = new DoneOrderUseCase(orderRepository);
const getOrderByIdUseCase = new GetOrderByIdUseCase(orderRepository);
const getOrderByUserIdUseCase = new GetOrderByUserIdUseCase(orderRepository);
const updateOrderStatusUseCase = new UpdateOrderStatusUseCase(orderRepository);
const updateOrderUseCase = new UpdateOrderUseCase(orderRepository);
const trackOrderUseCase = new TrackOrderUseCase(orderRepository);
const orderController = new OrderController(
  addOrderUseCase,
  deleteOrderUseCase,
  doneOrderUseCase,
  getOrderByIdUseCase,
  getOrderByUserIdUseCase,
  updateOrderStatusUseCase,
  updateOrderUseCase,
  trackOrderUseCase
);

// Routes
router.get("/order", authMiddleware, (req, res, next) =>
  orderController.addOrder(req, res, next)
);
router.put("/order/:orderId", authMiddleware, (req, res, next) =>
  orderController.updateOrder(req, res, next)
);
router.get("/orders/:orderId", authMiddleware, (req, res, next) =>
  orderController.findById(req, res, next)
);
router.get("/orders", authMiddleware, (req, res, next) =>
  orderController.findByUserId(req, res, next)
);
router.delete("/order/:orderId", authMiddleware, (req, res, next) =>
  orderController.deleteOrder(req, res, next)
);
router.put("/order/done/:orderId", authMiddleware, (req, res, next) =>
  orderController.doneOrder(req, res, next)
);
router.get("/order/status/:orderId", authMiddleware, (req, res, next) =>
  orderController.updateStatus(req, res, next)
);
router.post("/orders/track", (req, res, next) =>
  orderController.trackOrder(req, res, next)
);

module.exports = router;
