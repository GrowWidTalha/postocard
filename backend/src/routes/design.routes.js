"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const design_controller_1 = require("../controllers/design.controller");
const router = (0, express_1.Router)();
// Get all designs
router.get("/", design_controller_1.designController.getAllDesigns);
// Get design by ID
router.get("/:id", design_controller_1.designController.getDesignById);
// Create new design (protected route)
router.post("/", design_controller_1.designController.createDesign);
// Update design (protected route)
router.put("/:id", design_controller_1.designController.updateDesign);
// Delete design (protected route)
router.delete("/:id", design_controller_1.designController.deleteDesign);
exports.default = router;
