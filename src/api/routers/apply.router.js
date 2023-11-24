import express from "express";
import {
  applyJob,
  getUser,
  getJobApply,
  getStatus,
  getDetailApply,
  getUserByCpn,
  updateStatusJob,
} from "../controllers/apply.controller.js";

const router = express.Router();

router.get("/userApply", getUserByCpn);
router.get("/detail/:id", getDetailApply);
router.get("/status", getStatus);
router.get("/user", getUser);
router.get("/", getJobApply);
router.post("/", applyJob);
router.put("/status", updateStatusJob);

export default router;
