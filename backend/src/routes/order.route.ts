import { Router } from "express";
import { orderController } from "../controllers/order.controller";
import { authenticate } from "../middleware/auth";  // if you want it protected

const router = Router();

// Public or protected based on your needs
// @ts-ignore
router.get("/", orderController.getAllOrders);
// @ts-ignore

router.delete("/:id", orderController.deleteOrder);

router.patch(
    "/:id/assign",
    // @ts-ignore

    orderController.assignOrder
);

router.patch(
    "/:id/status",
    // @ts-ignore
    orderController.updateOrderStatus
);

export default router;
