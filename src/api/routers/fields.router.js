import express from "express";
import { getAll } from "../controllers/fields.controller.js";

const router = express.Router();

router.get("/", getAll);

export default router;
