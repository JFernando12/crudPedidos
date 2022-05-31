import { Router } from "express";
import { showOrders } from "../controllers/orders";

const router = Router();

router.get("/", showOrders);

export default router;