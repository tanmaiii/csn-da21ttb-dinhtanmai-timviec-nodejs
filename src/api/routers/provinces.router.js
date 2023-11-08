import express from "express";
import { getAll,getWithPage } from "../controllers/provinces.controller.js";

const router = express.Router();

router.get("/getWithPage", getWithPage)
router.get("/", getAll);

export default router;
