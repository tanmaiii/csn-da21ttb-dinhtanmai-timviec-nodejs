import express from "express";
import {
  applyJob,
  getUser,
  getJobApply,
} from "../controllers/apply.controller.js";

const router = express.Router();

router.get("/user", getUser);
router.get("/", getJobApply);
router.post("/", applyJob);

export default router;
