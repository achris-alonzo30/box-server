import { Router } from "express";
import { getDashboard } from "../controllers/dashboardController";
import { createProduct } from "../controllers/productsController";

const router = Router();

router.get("/", getDashboard);
router.post("/", createProduct);

export default router;