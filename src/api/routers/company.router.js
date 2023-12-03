import express from "express";
import {
  getCompany,
  getOwnerCompany,
  getAllCompany,
  updateCompany,
  updateIntroCompany,
  uploadImage,
  forgotPassword,
  resetPassword
} from "../controllers/company.controller.js";

const router = express.Router();

router.get("/owner/", getOwnerCompany);
router.get("/:id", getCompany);
router.get("/", getAllCompany);
router.put("/update", updateCompany);
router.put("/updateIntro", updateIntroCompany);
router.put("/uploadImage", uploadImage);
router.post("/forgot", forgotPassword);
router.post("/resetPassword/:id/:token", resetPassword);

export default router;
