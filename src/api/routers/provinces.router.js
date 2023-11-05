import express from "express";
import { getAll } from "../controllers/provinces.controller.js";

const router = express.Router();

router.get("/", getAll);

export default router;
