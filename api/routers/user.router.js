import express from "express";
import { getUser, updateUser, getOwnerUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/find/:id", getUser);
router.get("/owner/:id", getOwnerUser);
router.put("/", updateUser);

export default router;
