import express from "express";
const router = express.Router();

import { getById, postJob , getAll } from "../controllers/job.controller.js";

router.get("/:id", getById);
router.get("/", getAll);
router.post("/", postJob);

export default router;
