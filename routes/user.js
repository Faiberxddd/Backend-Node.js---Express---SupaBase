import { Router } from "express";

import { users, UserCreate, UserUpdate, UserDelete } from "../controllers/user.js";

const router = Router();

router.get("/", users);
router.post("/", UserCreate);
router.put("/:id", UserUpdate);
router.delete("/:id", UserDelete);

export default router;