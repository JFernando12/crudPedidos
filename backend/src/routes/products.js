import { Router } from "express";
import { deleteProduct, saveProduct, showProducts, updateProduct } from "../controllers/products";

const router = Router();

router.get("/", showProducts);

router.post("/", saveProduct);

router.delete("/:product_id", deleteProduct);

router.put("/:product_id", updateProduct);

export default router;