import express from "express";
import {
  getCompany,
  getOwnerCompany,
  getAllCompany,
  updateCompany,
  updateIntroCompany
} from "../controllers/company.controller.js";

const router = express.Router();

router.get("/find/:id", getCompany);
router.get("/owner/", getOwnerCompany)
router.get("/", getAllCompany);
router.put("/updateIntro", updateIntroCompany);
router.put("/update", updateCompany);

export default router;
