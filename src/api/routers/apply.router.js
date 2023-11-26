import express from "express";
import {
  applyJob,
  getUser,
  getJobApply,
  getStatus,
  getDetailApply,
  getUserByCpn,
  getUserHideByCpn,
  updateStatusJob,
  hiddenJobByCpn,
  unHiddenJobByCpn,
} from "../controllers/apply.controller.js";

const router = express.Router();

router.get("/userApply", getUserByCpn);
router.get("/userHideApply", getUserHideByCpn);
router.get("/detail/:id", getDetailApply);
router.get("/status", getStatus);
router.get("/user", getUser);
router.get("/", getJobApply);
router.post("/", applyJob);
router.put("/status", updateStatusJob);
router.put("/hidden", hiddenJobByCpn);
router.put("/unHidden", unHiddenJobByCpn);

export default router;
