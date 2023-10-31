import express from "express";
import { getUser, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/find/:id", getUser);
router.put("/", updateUser);

export default router;
