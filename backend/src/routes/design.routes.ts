import { Router } from "express";
import { designController } from "../controllers/design.controller";
import { authenticate } from "../middleware/auth";

const router = Router();

// Get all designs
router.get("/", designController.getAllDesigns);

// Get design by ID
router.get("/:id", designController.getDesignById);

// Create new design (protected route)
router.post("/", designController.createDesign);

// Update design (protected route)
router.put("/:id", designController.updateDesign);

// Delete design (protected route)
router.delete("/:id", designController.deleteDesign);

// Get designs by subcategory
// @ts-ignore
router.get("/subcategory/:subCategoryId", designController.getDesignsBySubCategory);

export default router;
