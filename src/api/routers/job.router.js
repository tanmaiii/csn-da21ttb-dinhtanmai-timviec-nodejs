import express from "express";
const router = express.Router();

import { getById, getByIdCompany, postJob , getAll } from "../controllers/job.controller.js";

router.get("/", getAll);
router.get("/:id", getById);
router.get("/company/:id", getByIdCompany)
router.post("/", postJob);

export default router;
