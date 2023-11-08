import express from "express";
import {
  getCompany,
  getOwnerCompany,
  getAllCompany,
  updateCompany,
  updateIntroCompany,
  uploadImage,
} from "../controllers/company.controller.js";

const router = express.Router();

router.get("/", getAllCompany);
router.get("/owner/", getOwnerCompany)
router.get("/find/:id", getCompany);
router.put("/update", updateCompany);
router.put("/updateIntro", updateIntroCompany);
router.put('/uploadImage', uploadImage)

export default router;
