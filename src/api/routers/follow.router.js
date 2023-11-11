import express from "express";
import {
  getCompanies,
  addFollow,
  removeFollow,
  getFollower,
} from "../controllers/follow.controller.js";

const router = express.Router();

router.get("/company/:idUser", getCompanies);
router.get("/follower", getFollower);
router.post("/", addFollow);
router.delete("/", removeFollow);

export default router;
