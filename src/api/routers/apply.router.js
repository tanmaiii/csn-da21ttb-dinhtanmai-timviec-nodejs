import express from "express";
import {
  applyJob,
  getUser,
  getJobApply,
  getStatus,
  getDetailApply,
  getUserByCpn,
  getUserHideByCpn,
  updateStatusUser,
  hiddenUserByCpn,
  unHiddenUserByCpn,
} from "../controllers/apply.controller.js";

const router = express.Router();

router.get("/userApply", getUserByCpn);
router.get("/userHideApply", getUserHideByCpn);
router.get("/detail/:id", getDetailApply);
router.get("/status", getStatus);
router.get("/user", getUser);
router.get("/", getJobApply);
router.post("/", applyJob);
router.put("/status", updateStatusUser);
router.put("/hidden", hiddenUserByCpn);
router.put("/unHidden", unHiddenUserByCpn);

export default router;
