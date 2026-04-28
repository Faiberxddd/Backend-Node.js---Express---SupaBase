import { Router } from "express";

import { orders, OrderCreate, OrderUpdate, OrderDelete } from "../controllers/order.js";

const router = Router();

router.get("/", orders);
router.post("/", OrderCreate);
router.put("/:id", OrderUpdate);
router.delete("/:id", OrderDelete); 

export default router;