import { Router } from "express";
import { getProducts } from "../controllers/productsController";

const router = Router();

router.get("/products", getProducts);

export default router;