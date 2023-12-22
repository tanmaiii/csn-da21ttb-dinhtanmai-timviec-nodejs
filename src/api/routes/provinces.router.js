import express from "express";
import {
  getAll,
  getWithType,
} from "../controllers/provinces.controller.js";

const router = express.Router();

router.get("/type", getWithType);
router.get("/", getAll);

export default router;
