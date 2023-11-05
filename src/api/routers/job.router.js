import express from "express";
const router = express.Router();

import { getById, postJob } from "../controllers/job.controller.js";

router.get("/:id", getById);
router.post("/", postJob);

export default router;
