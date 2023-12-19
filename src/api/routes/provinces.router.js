import express from "express";
import {
  getAll,
  getWithPage,
  getWithType,
} from "../controllers/provinces.controller.js";

const router = express.Router();

router.get("/type", getWithType);
router.get("/getWithPage", getWithPage);
router.get("/", getAll);

export default router;
