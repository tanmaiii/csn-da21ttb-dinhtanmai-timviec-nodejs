import express from "express";
import { getAll, getWithType } from "../controllers/fields.controller.js";

const router = express.Router();

router.get("/type", getWithType);
router.get("/", getAll);

export default router;
