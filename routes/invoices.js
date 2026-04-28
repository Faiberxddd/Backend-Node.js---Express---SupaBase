import { Router } from "express";

import { invoices, InvoiceCreate, InvoiceUpdate, InvoiceDelete } from "../controllers/invoices.js";

const router = Router();

router.get("/", invoices);
router.post("/", InvoiceCreate);
router.put("/:id", InvoiceUpdate);
router.delete("/:id", InvoiceDelete);   

export default router;