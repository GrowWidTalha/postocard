"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../controllers/order.controller");
const router = (0, express_1.Router)();
// Public or protected based on your needs
// @ts-ignore
router.get("/", order_controller_1.orderController.getAllOrders);
// @ts-ignore
router.delete("/:id", order_controller_1.orderController.deleteOrder);
router.patch("/:id/assign", 
// @ts-ignore
order_controller_1.orderController.assignOrder);
router.patch("/:id/status", 
// @ts-ignore
order_controller_1.orderController.updateOrderStatus);
exports.default = router;
